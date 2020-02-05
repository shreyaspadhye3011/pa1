
    try {
        
       if ( document.cookie.includes && document.cookie.includes('scuTestNotifications') ) {

            $.ajax({
                type: 'GET',
                url: 'https://www.scu.edu/media/scuedu/current/announcements.json?c='+Math.random(),
                jsonp: "callback",
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',                
                error: function(e) {
                    console.log(e.message);
                }
            });

            
            function notifications(data) {
                if ( data.length > 0 ) {
                   for(var i=0; i < data.length; i ++ ) {
                       ann = data[i];
                       out = '\n<div class="alert alert-site-wide alert-primary alert-dismissable mb-0 fixed-bottom d-none" role="alert" id="'+ann['id']+'">';
                       out += '\n\t<div class="container d-flex align-items-center">';
                       out += '\n\t\t<div class="alert-body text-white mr-auto"><strong>'+ann['title']+':</strong> '+ann['summary']+' '+ (ann['description']!=''? '<a href="https://www.scu.edu/news-and-events/notifications/?a='+ann['id']+'">Read more.</span></a>' :'') + '\n\t\t</div>';
                       out += '\n\t\t<button type="button" class="btn text-white ml-1 dismiss-alert" data-dismiss="alert" aria-label="Close">';
                       out += '\n\t\t\t<span aria-hidden="true">Close &times;</span>\n\t\t</button>';
                       out += '\n\t</div>';
                       out += '\n</div>';
                       $('header').after(out ); 
                   }
               }
                
                var alertElement = document.querySelector('.alert-site-wide');

                if (alertElement) {
                  var alertID = alertElement.id;

                  if (!sessionStorage.getItem('dismissAlerts') || sessionStorage.getItem('alertID') !== alertID) {
                    alertElement.classList.remove("d-none");

                    document.addEventListener('click', function (event) {
                      // Event Check
                      if (!event.target.matches('.dismiss-alert')) return;
                      event.preventDefault();
                      // Set cookie (for dismissables)
                      sessionStorage.setItem('dismissAlerts', 'true');
                      sessionStorage.setItem('alertID', alertID);
                    }, false);
                  }
                }
           }
          
        }
        
    } catch(err) {
      console.log( err.message );
    }
    