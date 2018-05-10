var NebPay = require('nebpay');
var nebPay = new NebPay();
var intervalQuery;

function funcIntervalQuery(serialNumber, pasteKey) {
  nebPay.queryPayInfo(serialNumber)
    .then(function (resp) {
        // console.log('tx result: ' + resp)
        var respObject = JSON.parse(resp)
        if(respObject.code === 0){
            clearInterval(intervalQuery)
        }
    })
    .catch(function (err) {
        // console.log(err);
    });
}

function generateRandomKey() {
  return Math.random().toString(36).substr(2, 12);
}

function submitPaste() {
  if ($("#pasteTitle").val() && $("#pasteContent").val()) {
    var data = {
      key: generateRandomKey(),
      pasteContent: $("#pasteContent").val(),
      pasteTitle: $("#pasteTitle").val(),
      syntax: $("#syntaxTypes").val(),
      date: moment().format('DD/MM/YYYY HH:ss')
    };

    data.pasteContent = data.pasteContent.replace(/\n/g, '\\n');
    data.pasteContent = data.pasteContent.replace(/"/g, '&quot;');

    var callArgs = "[\"" + data.key + "\",\"" + data.pasteTitle + "\",\"" + data.pasteContent + "\",\"" + data.syntax + "\",\"" + data.date + "\"]"

    var serialNumber = nebPay.call(dappAddress, '0', 'save', callArgs, {
      listener: function() {
        $('#pasteSuccess .modal-content .box').append('<br/><button id="redirect" class="button is-success" data-key="'+pasteKey+'">View Paste</button>');
        $('#pasteSuccess').addClass('is-active');
      }
    });

    intervalQuery = setInterval(function () {
      funcIntervalQuery(serialNumber, data.key);
    }, 5000);
  } else {
    alert('Paste title & content cannot be empty');
  }

}

function loadPaste(key) {
  var callArgs = "[\"" + key + "\"]";
  nebPay.simulateCall(dappAddress, 0, 'get', callArgs, {
     listener: showPasteInfo
 });
}

function showPasteInfo(resp) {
  var result = JSON.parse(resp.result);
  if (result) {
    $('#loading').hide();
    $('#prism-container').html('<pre class="line-numbers"><code class="language-' + result.syntax + '">' + result.value + '</code></pre>');
    Prism.highlightAll();
    $('#raw-container').html('<textarea class="textarea" rows="10">' + result.value + '</textarea>');
  } else {
    $('#loading').hide();
    $('#loadError').removeClass('is-hidden');
  }
}

function loadAuthorPastes(key) {
  nebPay.simulateCall(dappAddress, 0, 'getPastesByAuthor', '', {
     listener: showAuthorPastes
 });
}

function showAuthorPastes(resp) {
  var results = JSON.parse(resp.result);
  if (results && results.length) {
    results.reverse().forEach(function(paste) {
      $('#pastesList').append(`
        <div class="box">
          <a href="/${paste.key}"<h3 class="title is-4">${paste.title}</h3>
          <p class="subtitle">${paste.date}</p>
        </div>
      `)
    });
  } else {
    $('#pastesList').html('<p>There are no pastes saved for your account.');
  }
}

function checkWebExtensionWallet() {
  console.log('smart contract address', dappAddress);
  if (typeof webExtensionWallet === "undefined") {
    $('#noExtension').removeClass('is-hidden');
  }
}
