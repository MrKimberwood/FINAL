package dto;

public class RaavareBatchDTO {
	
	/** raavare batch id i området 1-99999999. Vælges af brugerne */  
	int rbId;                     
	public int getRbId() {
		return rbId;
	}
	public void setRbId(int rbId) {
		this.rbId = rbId;
	}
	
	
	/** raavare id i området 1-99999999 vælges af brugerne */
	int raavareId;          
	public int getRaavareId() {
		return raavareId;
	}
	public void setRaavareId(int raavareId) {
		this.raavareId = raavareId;
	}
	
	/** mængde på lager */
	double maengde;
	public double getMaengde() {
		return maengde;
	}
	public void setMaengde(double maengde) {
		this.maengde = maengde;
	}


}
