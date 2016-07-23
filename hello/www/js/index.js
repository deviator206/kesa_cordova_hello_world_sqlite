/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        var myDB = window.sqlitePlugin.openDatabase({name: "mySQLite.db", location: 'default'});
        document.getElementById("farmerBuy").innerHTML = "KILLER CHOKRA";

        myDB.transaction(function(transaction) {
            transaction.executeSql('CREATE TABLE IF NOT EXISTS test_me (id integer primary key, title text, desc text)', [],
            function(tx, result) {
            alert("Table created successfully");
            },
            function(error) {
            alert("Error occurred while creating the table.");
            });
            });


        document.getElementById("saveDataBtn").addEventListener("click",function(){

            alert(document.getElementById("titleTxt").value)
        myDB.transaction(function(transaction) {
            var executeQuery = "INSERT INTO test_me (title, desc) VALUES (?,?)";
transaction.executeSql(executeQuery, [document.getElementById("titleTxt").value,document.getElementById("descTxt").value], function(tx, result) {
alert('Inserted');
},
function(error){
alert('Error occurred',error);
});
        });    
        },false);


        document.getElementById("showSavedDataBtn").addEventListener("click",function(){
            alert("show data!");
           myDB.transaction(function(transaction) {
transaction.executeSql('SELECT * FROM test_me', [], function (tx, results) {
var len = results.rows.length, i;

var s1= ""
for (i = 0; i < len; i++){
s1 += "<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).title+"</td><td>"+results.rows.item(i).desc+"</td></tr>";
}
document.getElementById("farmerBuy").innerHTML="<table>"+s1+"</table>"
alert(s1);
}, null);
});


        },false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();