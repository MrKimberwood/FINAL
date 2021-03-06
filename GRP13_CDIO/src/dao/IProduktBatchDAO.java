package dao;

import java.util.List;

import database.DALException;
import dto.ProduktBatchDTO;

public interface IProduktBatchDAO {
	
	ProduktBatchDTO getProduktBatch(int pbId) throws DALException;
	List<ProduktBatchDTO> getProduktBatchList() throws DALException;
	void createProduktBatch(ProduktBatchDTO produktbatch) throws DALException;
	void updateProduktBatch(ProduktBatchDTO produktbatch) throws DALException;
	void updateStatus(ProduktBatchDTO produktbatch) throws DALException;
	


}
