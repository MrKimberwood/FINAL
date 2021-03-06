/**
 * 
 */

$(document).ready(function() {
	$( document ).ajaxSend(function( event, jqxhr, settings ) {
		jqxhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("user"))
	});

	var allRaavareBatches;
	
	//Get current logged in users rights from their JWT
	function getRole(){
		var rights = $.parseJSON(window.atob(localStorage.getItem("user").split(".")[1])).UserDTO.roles;
		return rights;
	}
	
	document.getElementById("OpretRaavarebatchSM").addEventListener("click",function() {


		var rights = getRole();
		
		if(rights.includes('Farmaceut') || rights.includes('Varkforer')){
			$("#table").hide();
			$("#createuser").hide();
			$("#createuser").hide();
			$("#createprescript").hide();
			$("#receptable").hide();
			$("#updateraavare").hide();
			$("#createraavare").hide();
			$("#rtable").hide();
			$("#pbtable").hide();
			$("#createRB").hide();
			$("#RBtable").hide();
			$("#popupID").hide();
			$("#createRB").show();
			$("#SPtable").hide();
			$("#createproduktbatch").hide();
			rights = "";
		}else{
			alert("You do not meet the required role to create a Raavarebatches!")
			rights = "";
		}

		return false;
		
	});

	// Load prescriptions on Vis Raavarebatch page
	document.getElementById("VisRaavarebatchSM").addEventListener("click",function() {


		var rights = getRole();
		
		if(rights.includes('Farmaceut') || rights.includes('Varkforer')){
			//visuals
			$("#table").hide();
			$("#createuser").hide();
			$("#updateuser").hide();
			$("#deactivateuser").hide();
			$("#updateraavare").hide();
			$("#createraavare").hide();
			$("#rtable").hide();
			$("#createprescript").hide();
			$("#SPtable").hide();
			$("#createRB").hide();
			$("#pbtable").hide();
			$("#popupID").hide();
			$("#createproduktbatch").hide();
			$("#RBtable").show();
			rights = "";
		}else{
			alert("You do not meet the required role to view Raavarebatches!")
			rights = "";
		}

		//ajax request
		$.ajax({
			url: "rest2/raavarebatchservice/raavarebatch",
			method: "GET",

			//success function
			success: function(data){
				allRaavareBatches = data;
				console.log(data);
				//Parse JSON from ajax request to html table
				//ini vars for table row
				var tr;

				//clearing old table rows and table heads
				$("#raavarebatchtable tr").remove();
				$("#raavarebatchtable th").remove();

				//Append table row with descriptions
				$('<tr>').append(
						$('<th>').text("Raavarebatch ID"),
						$('<th>').text("Raavare ID"),
						$('<th>').text("Maengde")
				).appendTo("#raavarebatchtable");

				//Loop through prescriptions and append them to the table in html
				$.each(allRaavareBatches, function(i, item) {
					$('<tr>').append(
							$('<td>').text(item.rbId),
							$('<td>').text(item.raavareId),
							$('<td>').text(item.maengde)
					).appendTo('#raavarebatchtable');
				});

			},
			
			error: function(resp){
				localStorage.clear();
				
				$("#table").hide();
				$("#createuser").hide();
				$("#createuser").hide();
				$("#createprescript").hide();
				$("#receptable").hide();
				$("#updateraavare").hide();
				$("#createraavare").hide();
				$("#rtable").hide();
				$("#pbtable").hide();
				$("#createRB").hide();
				$("#RBtable").hide();
				$("#popupID").hide();
				$("#createproduktbatch").hide();
				$("#deactivateuser").hide();
				$("#updateuser").hide();
				$("#usradmin").hide();
				$("#login").show();
				
				alert("Error, timed out or invalid security token");
				console.log('This is the ERROR method: '+resp);
			}
		});

	});
	
	//Create Raavarebatch Button
	$("#CreateRaavarebatch").submit( function() {               

		event.preventDefault();


		var data = $('#CreateRaavarebatch').serializeObject();

		console.log(data);
		
		$.ajax({
			url: "rest2/raavarebatchservice/create/raavarebatch",
			data: JSON.stringify(data),
			contentType: "application/json",
			method: 'POST',
			success: function(resp){
				console.log(data);
				console.log('This is the Success method')
				console.log(resp)
				document.getElementById("CreateRaavarebatch").reset();
				console.log("RBForm has been cleared")

				document.getElementById('createRBSuccess').style.display = 'block';
					setTimeout(function() {
						$('#createRBSuccess').fadeOut('slow').empty()}, 5000)
						
				//Goes back to menu
				$('#usradmin').show();
				$("#createRB").hide();

			},
			error: function(resp){
				localStorage.clear();
				
				$("#table").hide();
				$("#createuser").hide();
				$("#createuser").hide();
				$("#createprescript").hide();
				$("#receptable").hide();
				$("#updateraavare").hide();
				$("#createraavare").hide();
				$("#rtable").hide();
				$("#pbtable").hide();
				$("#createRB").hide();
				$("#RBtable").hide();
				$("#popupID").hide();
				$("#createproduktbatch").hide();
				$("#deactivateuser").hide();
				$("#updateuser").hide();
				$("#usradmin").hide();
				$("#login").show();
				
				alert("Error, timed out or invalid security token");
				console.log('This is the ERROR method: '+resp);
			}
		});
		return false;
	});
});