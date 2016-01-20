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
            editDoc(docName, doc._rev, doc.lastName, doc.firstName, doc.points);
            $("#id").val('');
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { alert(XMLHttpRequest.responseText); }
    });    
}

function editDoc(id, rev, lastName, firstName, points){
    
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