(function($){
  function ajax(method, url, success, data){
    data = data || null;
    if (data instanceof Object) data = JSON.stringify(data);
    var r = new XMLHttpRequest();
    r.onreadystatechange = function(){
      if(r.readyState==4 && (r.status==200 || r.status==0))
        success(r.responseText);
    };
    r.open(method,url,true);
    r.setRequestHeader('X-Requested-With','XMLHttpRequest');
    r.send(data);
  }

  $.get = function(url, success){ ajax('GET', url, success); };
  $.post = function(url, success, data){ ajax('POST', url, success, data); };
  $.getJSON = function(url, success){
    $.get(url, function(json){ success(JSON.parse(json)) });
  };
  
  $.fn.load = function(url, success){
    var self = this, parts = url.split(/\s/), selector;
    if(!this.dom.length) return this;
    if(parts.length>1) url = parts[0], selector = parts[1];
    $.get(url, function(response){
      self.html(selector ?
        $(document.createElement('div')).html(response).find(selector).html()
        : response);
      success && success();
    });
    return this;
  };
})(Zepto);
