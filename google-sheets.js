/* Global Variables */
CURRENT_DOC = 'https://docs.google.com/spreadsheets/d/1NxNGksP_0xa15HtJ_ynHk8Ep46U4pLpSFLEkRszVjBA/edit?usp=sharing';
COMPANY = 0; LOCATION = 1; CEO = 2; YEAR = 3; PAY = 4;
/*
 * Load google viz api
 * Set callback when connected
 */
google.load('visualization', '1.0');
google.setOnLoadCallback(getData);

/*
 * Send a query to google, do something with the response
 */ 
function getData(){
  query = new google.visualization.Query(CURRENT_DOC);
  query.send(handleQueryResponse);
}
/*
 * Handle the response
 * @param response the response from google
 */
function handleQueryResponse(response) {
  if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
  }
  data = JSON.parse((response.getDataTable()).toJSON());
  displayData(data);
  
///// MY EVENTS GO HERE //////////////////////////////////////////////
  

}
///// MY FUNCTIONS GO HERE //////////////////////////////////////////////

/*
 * Build table
 * @param data the array of from the spreadsheet
 */
function displayData(data){
  table = $("table#results tbody");

  $.each(data.rows, function(key,value){
  	if(key%2 == 1) {row="even"}else{row="odd"}
  	table.append("<tr class='" + row + "'>" + 
  				   "<td class='company'>" + this.c[COMPANY].v + "</td>" +
  				   "<td class='location'>" + this.c[LOCATION].v + "</td>" +
  				   "<td class='ceo'>" + this.c[CEO].v + "</td>" +
  				   "<td class='year'>" + this.c[YEAR].v + "</td>" +
  				   "<td class='pay'>" + this.c[PAY].f + "</td>" + 
  				 "</tr>"); 
  });
}