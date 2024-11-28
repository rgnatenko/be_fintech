import { Request, Response, NextFunction } from 'express';
import ContractService from '../services/contract.service';
import { IContract } from '../models/contract.model';
import { getDefaultEndDate } from '../utils/date';
import { BaseController } from './base.controller';

class ContractController extends BaseController {
  constructor() {
    super();
    this.getContracts = this.getContracts.bind(this);
    this.postContract = this.postContract.bind(this);
    this.updateContract = this.updateContract.bind(this);
    this.deleteContract = this.deleteContract.bind(this);
  }

  async getContracts(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      let { page, limit, filter } = req.body;
      const filterParam = this.getFilter(filter);

      const contracts = await ContractService.getContracts(
        userId,
        page,
        limit,
        filterParam,
      );

      res.json(contracts);
    } catch (e) {
      next(e);
    }
  }

  async postContract(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.validateUser(req);
      const contract: IContract = req.body;
      const defaultContractEndDate = getDefaultEndDate();

      const newContract = await ContractService.postContract({
        ...contract,
        startDate: new Date(),
        endDate: contract.endDate || defaultContractEndDate,
        userId,
      });

      res.status(201).json(newContract);
    } catch (e) {
      next(e);
    }
  }

  async updateContract(req: Request, res: Response, next: NextFunction) {
    try {
      const contractId = req.params.id;
      const { ...data } = req.body;

      const updatedContract = await ContractService.updateContract(
        contractId,
        data,
      );

      res.status(200).json(updatedContract);
    } catch (e) {
      next(e);
    }
  }

  async deleteContract(req: Request, res: Response, next: NextFunction) {
    try {
      const contractId = req.params.id;

      const deletedContract = await ContractService.deleteContract(contractId);

      res.json(deletedContract);
    } catch (e) {
      next(e);
    }
  }
}

export default new ContractController();
