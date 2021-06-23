
/*********************************************************************************
	MyTrello: Custom API wrapper for Trello
**********************************************************************************/ 

const MyTrello = {

	endpoint: "https://api.trello.com/1",
	key: "78824f4a41b17e3ab87a2934fd5e9fbb",
	token: "18616dd5585620de70fae4d1b6a4463a553581ec9aa7e211aaac45ec1d2707a3",

	board_id: "5fdfd980e5fd1b0cd5218f6a",
	wager_field: "5fe16b535ffa5a62d5f64550",
	list_id: undefined,

	current_game_list_id: "",
	demo_list_id: "5fdfd980e5fd1b0cd5218f6d",
	test_list_id: "60115ebf2caf916afa9cc107",
	admin_list_id: "6007bbc9ec73367514314430",

	
	custom_field_edit_url: "601cc5e0b397f3851991919a",
	custom_field_pub_url: "601eb6d45a6cfd723772f978",
	custom_field_phrase: "601eb6e52f10e63f573f187f",
	custom_field_score:   "601eb6ed9695ad33f90f6f14",
	custom_field_wager: "601eb6fa16ebab868c557f2e",

	authorizeTrello: function(){ return true; },

/*** Helper Functions ***/
	set_current_game_list: function(listID){
		this.current_game_list_id = listID;
	},


/*** CREATE Calls ***/

	// Create attachments on a card
	create_attachment: function(cardID, fileData, successCallback){
		// let params = `name=${fileName}&mimeType=${fileType}&file=${fileData}`
		let trello_path = `${this.endpoint}/cards/${cardID}/attachments`;
		// ?key=${this.key}&token=${this.token}}&${params}`;
		myajax.AJAX({ method:"POST", path:trello_path, data:fileData, success:successCallback, failure:Logger.errorHandler});		
	},

	// Creates a new Trello Card
	create_card: function(listID, team_name, successCallback){
		let params = `name=${team_name}&idList=${listID}&pos=top`;
		let trello_path = `${this.endpoint}/cards/?key=${this.key}&token=${this.token}&${params}`
		myajax.AJAX({ method: "POST", path:trello_path, data:"", success: successCallback, failure:Logger.errorHandler});
	},

	// Creates a new Trello Card
	create_game_card: function(listID, team_name, successCallback){
		let params = `name=${team_name}&idList=${listID}&pos=top&idLabels=5fdfd98086c6bc9cc56d4db3`;
		let trello_path = `${this.endpoint}/cards/?key=${this.key}&token=${this.token}&${params}`
		myajax.AJAX({ method: "POST", path:trello_path, data:"", success: successCallback, failure:Logger.errorHandler});
	},

	// Add a comment to a card
	create_card_comment: function(card_id, comment){
		let param = `text=${comment}`;
		let trello_path = `${this.endpoint}/cards/${card_id}/actions/comments?key=${this.key}&token=${this.token}&${param}`;
		myajax.AJAX({ method: "POST", path:trello_path, data:"", failure:Logger.errorHandler});
	},

	// Create a new list
	create_list: function(listName,successCallback){
		let param = `name=${listName}`
		let trello_path = `${this.endpoint}/boards/${this.board_id}/lists?key=${this.key}&token=${this.token}&${param}`
		myajax.AJAX({ method: "POST", path:trello_path, data:"", success: successCallback, failure:Logger.errorHandler});
	},

	


/*** GET Calls ***/
	
	// Get list of boards;
	get_boards: function(successCallback){
		let trello_path = `${this.endpoint}/members/me/boards?key=${this.key}&token=${this.token}`
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},

	// Get Custom Fields;
	get_custom_fields: function(successCallback){
		let trello_path = `${this.endpoint}//boards/${this.board_id}/customFields?key=${this.key}&token=${this.token}`
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},

	// Get a list of Trello Cards
	get_cards: function(listID, successCallback){
		let trello_path = `${this.endpoint}/lists/${listID}/cards?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},

	// Gets a single trello card's actions
	get_card_actions: function(card_id, successCallback){
						let trello_path = `${this.endpoint}/cards/${card_id}/actions/?key=${this.key}&token=${this.token}`;
						myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
					},

	// Gets a single trello card's actions
	get_card_attachments: function(card_id, successCallback){
		let trello_path = `${this.endpoint}/cards/${card_id}/attachments/?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},


	get_card_custom_fields: function(card_id, successCallback){
		let trello_path = `${this.endpoint}/cards/${card_id}/customFieldItems/?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},

	// Get Labels
	get_labels: function(successCallback){
		let trello_path = `${this.endpoint}/boards/${this.board_id}/labels?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "GET", path : trello_path, success: successCallback, failure : Logger.errorHandler});
	},

	// Gets the set of Trello Lists
	get_lists: function(successCallback){
		let param="filter=open";
		let trello_path = `${this.endpoint}/boards/${this.board_id}/lists?key=${this.key}&token=${this.token}&${param}`;
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:Logger.errorHandler});
	},

	// Gets a single trello cards
	get_single_card: function(card_id, successCallback, failureCallback=undefined){
		let trello_path = `${this.endpoint}/cards/${card_id}/?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "GET", path:trello_path, success: successCallback, failure:failureCallback});
	},


/*** UPDATE Calls ***/

	// Update a single card
	update_card: function(card_id, new_desc){
		let param = `desc=${new_desc}`;
		let trello_path = `${this.endpoint}/cards/${card_id}/?key=${this.key}&token=${this.token}&${param}`;
		myajax.AJAX({ method: "PUT", path:trello_path, failure:Logger.errorHandler});
	},

	update_card_description: function(card_id, new_desc){
		let obj = { "desc": new_desc };
		var encoded = JSON.stringify(obj);
		let trello_path = `${this.endpoint}/cards/${card_id}/?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "PUT", path:trello_path, data:encoded, contentType:"JSON", failure:Logger.errorHandler});
	},

	update_card_name: function(card_id, new_name){
		let param = `name=${new_name}`;
		let trello_path = `${this.endpoint}/cards/${card_id}/?key=${this.key}&token=${this.token}&${param}`;
		myajax.AJAX({ method: "PUT", path:trello_path, failure:Logger.errorHandler});
	},

	update_card_custom_field: function(card_id, field_id, new_value){
		// var obj = `{ "value":{ "text":"${new_value}" } }`;
		var obj = { "value":{ "text":new_value } };
		// var encoded = encodeURIComponent(obj);
		var encoded = JSON.stringify(obj);
		let trello_path = `${this.endpoint}/cards/${card_id}/customField/${field_id}/item/?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method: "PUT", path:trello_path, data:encoded, contentType:"JSON", failure:Logger.errorHandler});
	},

	// Update list to be archived
	update_list_to_archive: function(list_id, new_name, successCallback){
		let param = `name=${new_name}&closed=true`;
		let trello_path = `${this.endpoint}/lists/${list_id}/?key=${this.key}&token=${this.token}&${param}`;
		myajax.AJAX({ method:"PUT", path:trello_path, success:successCallback, failure:Logger.errorHandler});
	},


/*** DELETE Calls ***/

	delete_attachment: function(cardID, attachmentID, successCallback){
		let trello_path = `${this.endpoint}/cards/${cardID}/attachments/${attachmentID}?key=${this.key}&token=${this.token}`;
		myajax.AJAX({ method:"DELETE", path:trello_path, success:successCallback, failure:Logger.errorHandler});		
	},

}