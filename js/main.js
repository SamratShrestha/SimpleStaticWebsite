$(function() {
  //responsive nav bar
  menu = $("#main-header ul");
  // menu.slideDown();
  $("#openup").on("click", function(e) {
    e.preventDefault();
    // menu.slideDown();
    menu.slideToggle();
  });

  $(window).resize(function() {
    var w = $(this).width();
    if (w > 480 && menu.is(":hidden")) {
      menu.removeAttr("style");
    }
  });

  $("#mainheader li").on("click", function(e) {
    var w = $(window).width();
    if (w < 480) {
      menu.slideToggle();
    }
  });

  // Toggles Search Bar on click
  $("i.fa.fa-search").click(function() {
    $("#search-bar input").animate({
      width: "toggle"
    });
  });
  // When the user scrolls down 20px from the top of the document, show the button
  $(window).scroll(function() {
    scrollFunction();
  });

  function scrollFunction() {
    if ($("body")[0].scrollTop > 20 || $("html")[0].scrollTop > 20) {
      $("#top").css("display", "block");
    } else {
      $("#top").css("display", "none");
    }
  }
  //scroll to top
  $("#top").click(function() {
    $("html,body").animate({ scrollTop: 0 }, "slow");
    // window.scroll(0,0);
    // return false;
  });

  //dark mode
  $("#switch").click(function() {
    $("body").toggleClass("dark-mode");
  });

  //Toogle readmore and readless
  // Hide the extra content initially, using JS so that if JS is disabled, no problemo:
  $(".read-more-content").addClass("hide");
  $(".read-more-show, .read-more-hide").removeClass("hide");

  // Set up the toggle effect:
  $(".read-more-show").on("click", function(e) {
    $(this)
      .next(".read-more-content")
      .removeClass("hide");
    $(this).addClass("hide");
    e.preventDefault();
  });

  $(".read-more-hide").on("click", function(e) {
    var p = $(this).parent(".read-more-content");
    p.addClass("hide");
    p.prev(".read-more-show").removeClass("hide"); // Hide only the preceding "Read More"
    e.preventDefault();
  });
  //local storage
  $("#submit").click(function() {
    var anime = $("#anime")[0];
    var name = $("#name")[0];
    var review = $("#review")[0];
    localStorage.clear();
    localStorage.setItem("AnimeName", anime.value);
    localStorage.setItem("YourName", name.value);
    localStorage.setItem("Review", review.value);
  });
  $("#suscribe").click(function() {
    var email = $("#email")[0];
    localStorage.clear();
    localStorage.setItem("Email", email.value);
  });

  //image pop up
  $(".photo-row div canvas").click(function() {
    // $(this)
    //   .next()
    //   .css("display", "block");
    //   $(this).next().addClass('close');
    var $src = $(this)
      .next()
      .attr("src");
    $(".show").fadeIn();
    $(".img-show img").attr("src", $src);
    $(".img-show canvas").hide();
  });

  $("span, .over").click(function() {
    $(".show").fadeOut();
  });

  //hide and show content of spoiler page
  $(".content").hide("slow");
  $(".title").click(function() {
    $(".content").hide("slow");
    $(this)
      .parent()
      .children(".content")
      .show();
  });

  //redirect to error page
  $("#frmSearch").submit(function() {
    window.location.href = "html/error.html";
    return false;
  });

  //return back to the page
  $("#back").click(function() {
    history.back();
  });

 
  //function to retrieve data from xml by calling loadDoc function
  $(function() {
    $("#search").keyup(function() {
      // e.preventDefault;
      // $('#anime').css('display','block');
      if ($("#search").val() === "") {
        $("#anime-load").css("display", "none");
      } else {
        loadDoc();
        $("#anime-load").css("display", "block");
      }

      // console.log($("#search").val())
    });
  });
  function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
    };
    xhttp.open("GET", "../xml/anime.xml", true);
    xhttp.send();
  }

  function myFunction(xml) {
    var i;
    var xmlDoc = xml.responseXML;
    var div = "";

    var x = xmlDoc.getElementsByTagName("ANIME");

    var search = $("#search")[0].value.toUpperCase();
    // console.log(x[1].getElementsByTagName("NAME")[0].childNodes[0].nodeValue);

    // alert(search);
    for (i = 0; i < x.length; i++) {
      var value = x[i]
        .getElementsByTagName("NAME")[0]
        .childNodes[0].nodeValue.toUpperCase();
      if (value.startsWith(search)) {
        div += "<li>" + value + "</li>";
      }
    }
    if (div) {
      document.getElementById("anime-load").innerHTML = div;
    } else {
      document.getElementById("anime-load").innerHTML = "Anime not Found";
    }
  }
});
