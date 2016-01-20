/**
 * 
 */

function searchDoc(){
    
    var name = $("#id").val();
    $.ajax({
        type:    'GET',
        url:    '../../' + name,
        async: true,
        success:function(data){
            var doc = JSON.parse(data);
            editDoc(name, doc._rev, doc.ingavedatum, doc.einddatum, doc.prioriteit, doc.beschrijving, doc.status);
            $("#id").val('');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
    });    
}

function editDoc(id, rev, ingavedatum, einddatum, prioriteit, beschrijving, status){
    
    $('#output').hide();
    $('#edit').show();
    
    var html = '';
    
    // Build edit form
    html += '<h3>Editeer record</h3><table class="table table-hover">';
    html += '<input type="hidden" id="_id" value="' + id + '"/>';
    html += '<input type="hidden" id="_rev" value="' + rev + '"/>';
    html += '<tr><td>ingavedatum :</td><td><input id="ingavedatum" type="text" size="50" value="' + ingavedatum + '"/></td></tr>';
    html += '<tr><td>einddatum:</td><td><input id="einddatum" type="text" size="50" value="' + einddatum + '"/></td></tr>';
    html += '<tr><td>prioriteit:</td><td><input id="prioriteit" type="text" size="10" value="' + prioriteit + '"/></td></tr>';
    html += '<tr><td>beschrijving:</td><td><input id="beschrijving" type="text" size="10" value="' + beschrijving + '"/></td></tr>';
    html += '<tr><td>status:</td><td><input id="status" type="text" size="10" value="' + status + '"/></td></tr>';
    html += '<tr><td colspan="2" align="center"><button type="button" class="btn btn-primary" onClick="updateDoc()">Ok</button></td></tr>';
    html += '</table>';
    
    $('#edit').html(html);
}

function updateDoc(){
    
    var id = $("#_id").val();
    var rev = $("#_rev").val();
    var ingavedatum = $("#ingavedatum").val();
    var einddatum = $("#einddatum").val();
    var prioriteit = $("#prioriteit").val();
    var beschrijving = $("#beschrijving").val();
    var status = $("#status").val();

    var doc = {};

    doc._id = id;
    doc._rev = rev;
    doc.ingavedatum = ingavedatum;
    doc.einddatum = einddatum;
    doc.prioriteit = parseInt(prioriteit);
    doc.beschrijving = beschrijving;
    doc.status = status;
    var json = JSON.stringify(doc);

    $.ajax({
        type : 'PUT',
        url : '../../' + id,
        data : json,
        contentType : 'application/json',
        async : true,
        success : function(data){
            $('#edit').hide();
            $('#output').show();
            buildOutput();
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}

function buildOutput(){

    $('#output').empty();
    var html = '<table class="table table-hover">';
    $.ajax({
        type : 'GET',
        url : '../../_all_docs?include_docs=true',
        async : true,
        success : function(data){
            var arr = JSON.parse(data).rows;

            for(var i = 0; i < arr.length; i++){

                if (arr[i].id.indexOf('_design') == -1){
                    var doc = arr[i].doc;
                    html += '<tr><td>' + doc.ingavedatum + '</td><td>' + doc.einddatum
                            + '</td><td>' + doc.prioriteit + '</td><td>' + doc.beschrijving + '</td><td>' + doc.status
                            + '</td>'
                            + '<td><button type="button" class="btn btn-success" onClick="editDoc(\'' + doc._id + '\',\'' + doc._rev + '\',\'' + doc.ingavedatum+ '\',\'' + doc.einddatum + '\',\'' + doc.prioriteit+ '\',\'' + doc.beschrijving+ '\',\'' + doc.status + '\')">Edit</button></td>';
                }
            }
            html += '</table>';
            $('#output').html(html);
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
}