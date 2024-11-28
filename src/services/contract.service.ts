import ApiError from '../exceptions/api-error';
import { Errors } from '../exceptions/errors';
import Contract, { IContract } from '../models/contract.model';
import { getQuery } from '../utils/query';

class ContractService {
  async getContracts(
    userId: string,
    page: number = 1,
    limit: number = 100,
    filter: {
      contractName: string;
      client: string;
      startDate: Date;
      endDate: Date;
      terms: string;
      amount: number;
    },
  ) {
    const query = getQuery(userId, filter);

    const contracts = await Contract.find(query)
      .skip(limit * (page - 1))
      .limit(limit);

    if (!contracts) {
      throw new ApiError(Errors.ContractsError);
    }

    return contracts;
  }

  async postContract(contract: IContract) {
    if (!contract.contractName || !contract.client || !contract.amount) {
      throw new ApiError(Errors.InvalidContractData);
    }

    const newContract = await Contract.create(contract);
    return newContract;
  }

  async updateContract(
    id: string,
    data: Partial<{
      contractName: string;
      startDate: Date;
      endDate: Date;
      terms: string;
      amount: number;
    }>,
  ) {
    const updatedContract = await Contract.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedContract) {
      throw new ApiError(Errors.ContractNotFound);
    }

    return updatedContract;
  }

  async deleteContract(id: string) {
    const deletedContract = await Contract.deleteOne({ _id: id });

    if (!deletedContract) {
      throw new ApiError(Errors.ContractNotFound);
    }

    return deletedContract;
  }
}

export default new ContractService();
