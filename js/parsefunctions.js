        Parse.initialize("aLexOkyvqhOkmMfiqi3a8KQd0LxjCFk4d5wzlHyZ", "TRMrtFBvo1lh01ZheveQMRSoP53CRBVVUtHh3SVp");
        //Parse.initialize("qLzYhfH37DNpbtCeUttsGO6yEaT6dVRNpy10gZzK", "DxpkbfCURfqlJ6Faq2ZxRbxvhl37dIFeykVDzm38");

//must needs global
var currentUser = Parse.User.current();

//create a new subclass of Parse.Object
var Story = Parse.Object.extend("Story");
//register the subclass
Parse.Object.registerSubclass('Story', Story);
//create a new instance of that class
var story = new Story();

        $(document).ready(function(){
            //get the filename of the current location
            var location = document.location.href.match(/[^\/]+$/)[0];
            //redirect already logged-in user

            if(currentUser && location!="home.html"){
                window.location.href = "home.html";
            }else{
                //stay on login page
            }

            $('.form-new').hide();
            $('#login-toggle').css("opacity","0.5");

            $('.toggle-form').click(function(){

                $('#login-toggle').click(function(){
                    $('#login-toggle').css("opacity","0.5");
                    $('#signup-toggle').css("opacity","1");
                    $('.form-new').hide();
                    $('.form-login').show();
                });

                $('#signup-toggle').click(function(){
                    $('#signup-toggle').css("opacity","0.5");
                    $('#login-toggle').css("opacity","1");
                    $('.form-login').hide();
                    $('.form-new').show();
                });

                //for pressing enter to login
//                $(document).one("keypress",(function(e){
//                        if($('.form-new').is(":visible")){
//                            if(e.which == 13){
//                            alert('Create an account enter!');
//                            }
//                        }
//                        if(document.getElementsByClassName('form-login').visibility == true){
//                            if(e.which == 13){
//                            alert('Login enter!');
//                            }
//                        }
//
//                    });

            });

        });


//button handlers
        $('#btn-submit').click(function(){
            console.log("button click submit");
            submitForm();
        });

        $('#btn-login').click(function(){
            console.log("button click login");
            logIn();
        });

        $('#btn-logout').click(function(){
            console.log("button click logout");
            logOut();
        });

        function submitForm(){
            console.log("submit form");

            //necessary vars
            var username = document.getElementById("inp-name").value;
            var password = document.getElementById("inp-password").value;
            var email = document.getElementById("inp-email").value;

            //loggers
            console.log("username: " + username);
            console.log("password: " + password);
            console.log("email: " + email);

            //parse that shit
            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);

            //don't forget to sign up!
            user.signUp(null, {
                success: function(user) {
                    console.log("signed up");
                    alert("Thank you for signing up. Please check your inbox for a verification email.");
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    alert("Error: " + error.code + " " + error.message);
                }
            });

        }

        function logIn(){
            console.log("log in");

            //check for current user
            if (currentUser) {
                // do stuff with the user
                console.log("current user");
            } else {
                // show the signup or login page
                console.log("show login page");
            }

            var logName = document.getElementById("log-name").value;
            var logPass = document.getElementById("log-pass").value;

            Parse.User.logIn(logName, logPass, {
                success: function(user){
                    console.log("login successful!");
                    window.location.href = "home.html";
                },
                error: function(user, error){
                    alert("Login failed! Please try again.");
                    $('#log-name').val('');
                    $('#log-pass').val('');
                }

            });

        }

//home
    $('#btn-logout').click(function(){
            logOut();
        });

    function logOut(){
            Parse.User.logOut();
            console.log("current user: " + currentUser);
            window.location.href = "index.html";

        }

        function newStory(){

          // var NewStory = Parse.Object.extend("Story",{
          //   //Instance methods
          //   initialize: function (attrs, options){
          //     this.genre = "fiction";
          //   }
          // });
          //var story = new Story();
          //alert(newStory);

          story.set("genre", "fiction");
          story.set("author", "lindsay");
          story.set("wordCount", 500);
          story.set("mainText", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas quis varius felis, eu facilisis massa. Nulla facilisi. Vivamus id ipsum in tortor vulputate posuere. Aenean augue nibh, mollis eu metus in, sollicitudin posuere enim. Vestibulum blandit ac magna auctor venenatis. Phasellus vel velit vel ante condimentum lobortis et non dui. Vivamus urna ex, pretium quis hendrerit id, sodales ac lacus. Sed eu eros tempus augue eleifend dictum. Sed id sollicitudin augue. Phasellus egestas ex sed augue condimentum, a egestas diam placerat. Suspendisse pellentesque enim vitae turpis iaculis, vel bibendum arcu facilisis. Morbi pretium convallis erat quis eleifend.");

          story.save(null, {
            success: function(story){
              alert('New object created with objectId: ' + story.id);
            },
            error: function(gameScore, error){
              alert('Failed to create new object, with error code: ' + error.message);
            }
          });



        }

        function saveStory(){
          var relation = currentUser.relation("story");
          relation.add(story);
          currentUser.save();

        }






        //    var TestObject = Parse.Object.extend("TestObject");
        //    var testObject = new TestObject();
        //      testObject.save({foo: "bar"}, {
        //      success: function(object) {
        //        $(".success").show();
        //      },
        //      error: function(model, error) {
        //        $(".error").show();
        //      }
        //    });
