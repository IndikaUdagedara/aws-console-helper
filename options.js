// Saves options to chrome.storage

var options_default = {
    accounts :
    {
        accountId: 'account alias'
    },

    users : 
    {
        username: 'user alias'
    },

    roles : 
    {
        rolename: 'role alias'
    }
}

function save_options() {

    var options = JSON.parse($('#options').val());
    
    chrome.storage.sync.set({options: options}, function() {
      // Update status to let user know options were saved.
      var status = $('#status');
      status.text('Options saved.');
      setTimeout(function() {
        status.text('');
      }, 750);
    });
}
  
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get('options', function(items) {
    $('#options').val(JSON.stringify(items.options || options_default, undefined, 4));
  });
}

function reset_options() {
    chrome.storage.sync.set({options: options_default}, function(items){
      $('#options').val(SON.stringify(options_default, undefined, 4));
      var status = $('#status');
      status.text('Options reset.');
      setTimeout(function() {
        status.text('');
      }, 750);
    })
}

$(document).ready(restore_options);
$('#save').click(save_options);
$('#reset').click(reset_options);