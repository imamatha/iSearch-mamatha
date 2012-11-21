var total_page_discussion =0;
var total_page_document =0;
var total_page_blog =0;
var total_page_all =0;
var getDiscussion="discussion";
var getDocument="document";
var getBlog="blog";
var getAll="all";
var lastIndex=0;
var firstIndex=0;

var feedbackText = "";

// On-view-load initialization
function init() {
      $("#search").click(search);
      //$("#notHelpful").click(postQuestion);
       //$("#notHelpful").on("click", postQuestion);
	// var  mini = new gadgets.MiniMessage();
      gadgets.window.adjustHeight();
}

$(".notHelpful").live('click', function() {
//$(document).ready(function() {
//	$(".notHelpful").click(function() {
	$("#search-info").hide();
	$(".content").hide();
	$("#postQuestionForm").show();
    var value = $("#query").val();
    //console.log("query string:"+value);
    $("#subject").val(value);
    $("#desc").val(value);
});


$(".cancel").live('click',function(){
	$("#search-info").show();
	$(".content").hide();
	$("#postQuestionForm").hide();

});

$(document).ready(function() {

    $('.post').click(function(e) {
		
		createDiscussion();
  	  	
    });
});

function createDiscussion() {
	var groupID=1618;
      
   osapi.jive.core.groups.get({
			userId : "@me",
			id : groupID
		}).execute(function (response) {
		if (response.error) {
			alert("Error " + response.error.code + " reading groups. Error message was: " + response.error.message);
		}
		else {
			var targetGroup = response.data;
			var messageTitle=$("#subject").val();
			var messageHTML=$("#desc").val();
			var mini;

			
			var discussion = {subject: messageTitle, html: messageHTML, question:true};
			var request = targetGroup.discussions.create(discussion);
			request.execute(function(response) {
				if (response.error) {
					console.log(response.error);
				}
				else {
					console.log ("Discussion created successfully");
					//$("#postQuestionForm").hide();
					//$("#PostMsg").show();
					$("#postQuestionForm").css("display", "none");
					$("#PostMsg").css("display", "block");
					 //mini.createDismissibleMessage("succesfull");
					var redirectDiscussion= response.data.resources.html.ref;
					setTimeout(function() {
					  window.location.href = redirectDiscussion;
					}, 4000);					
				}
			});
		}
	});
  
}
//onhover event of expand icon
$("span.image-button").live('mouseover', function () {
                var curRowId = $(this).attr("id");
		if(curRowId.indexOf("all") != -1){
				if(curRowId.indexOf("DOC") != -1){
				   var docID = (curRowId.substring(curRowId.lastIndexOf("-"))).substr(1);
				   console.log("i'm in if section:document");
				   $(".content").html("");
					$('.firstdiv').css('background-color', '#FFFFFF');
					$('#alldiv_'+docID).css('background-color', '#F2F2F2');
				   expandDocument(docID);
				}
				else if(curRowId.indexOf("post") != -1){
				var blogpostId = (curRowId.substring(curRowId.lastIndexOf("-"))).substr(1);
				console.log("i'm in if section:blogID::"+blogpostId);
				var finalBlogId=(blogpostId.substring(blogpostId.lastIndexOf("/"))).substr(1);
				console.log("i'm in if section:PostID::"+finalBlogId)
				var postId=blogpostId;
				var finalpostId=postId.substr(0,postId.indexOf('/'))
				$(".content").html("");
				$('.firstdiv').css('background-color', '#FFFFFF');
				$('#alldiv_'+finalpostId).css('background-color', '#F2F2F2');
				expandBlog(finalBlogId,blogpostId);
				}
				else
				{
					console.log("i'm in else section");
					var discussionId = (curRowId.substring(curRowId.lastIndexOf("_"))).substr(1);
					
					$(".content").html("");
					$('.firstdiv').css('background-color', '#FFFFFF');
					$('#alldiv_'+discussionId).css('background-color', '#F2F2F2');
					expandDiscussion(discussionId);
				}
			}
			else
			{
				if(curRowId.indexOf("DOC") != -1){
				   var docID = (curRowId.substring(curRowId.lastIndexOf("-"))).substr(1);
				   console.log("i'm in if section:document");
				   $(".content").html("");
					$('.firstdiv').css('background-color', '#FFFFFF');
					$('#div_'+docID).css('background-color', '#F2F2F2');
				   expandDocument(docID);
				   
				}
				else if(curRowId.indexOf("post") != -1){
				
				var blogpostId = (curRowId.substring(curRowId.lastIndexOf("-"))).substr(1);
				console.log("i'm in if section:blogID::"+blogpostId);
				var finalBlogId=(blogpostId.substring(blogpostId.lastIndexOf("/"))).substr(1);
				console.log("i'm in if section:PostID::"+finalBlogId)
				var postId=blogpostId;
				var finalpostId=postId.substr(0,postId.indexOf('/'))
				$(".content").html("");
				$('.firstdiv').css('background-color', '#FFFFFF');
				$('#div_'+finalpostId).css('background-color', '#F2F2F2');
				expandBlog(finalBlogId,blogpostId);
				}
				else
				{
					console.log("i'm in else section");
					$(".content").html("");
					$('.firstdiv').css('background-color', '#FFFFFF');
					$('#div_'+curRowId).css('background-color', '#F2F2F2');
					expandDiscussion(curRowId);
					
				}
			
			}
			
			

 });
    
$(document).ready(function() {

    $('ul.tablist li').click(function(e) {
    $('.firstdiv').css('background-color', '#FFFFFF');
    $(".content").hide();
    });
});
 //function for tabs   
 $(function() {
         $( "#tabs" ).tabs();
        
 });
 

//function for date format
 function monthConvert(d){

  var outMonth="";
    switch (d) {
	    case '01':
	    outMonth= "Jan";
	    break;
	    case '02':
	    outMonth= "Feb";
	    break;
	    case '03':
	    outMonth= "Mar";
	    break;
	    case '04':
	    outMonth= "Apr";
	    break;
	    case '05':
	    outMonth= "May";
	    break;
	    case '06':
	    outMonth= "Jun";
	    break;
	    case '07':
	    outMonth= "Jul";
	    break;
	    case '08':
	    outMonth= "Aug";
	    break;
	    case '09':
	    outMonth= "Sep";
	    break;
	    case '10':
	    outMonth= "Oct";
	    break;
	    case '11':
	    outMonth= "Nov";
	    break;
	    case '12':
	    outMonth= "Dec";
	    break;
    }
 return outMonth;
}
       
//function for expand button to display the discussions with correct and helpful answers
function expandDiscussion(id){
        
	
	console.log("Expand Row Id::: "+ id);
	var discussionMessage="";
	var correctanswer="";
	var helpfulanswer="";
	var rootmessage="";
	var myDate="";
	
	var request = osapi.jive.core.discussions.get({id: id});
	request.execute(function(response) { 
	         console.log("Expanding discussion response is " + JSON.stringify(response.data));
	         var discussionresult=response.data;
		
		if (response.error) {
			console.log("Error in get: "+response.error.message);
		}
		    
		else{
			myDate=response.data.creationDate.substr(0,10);                  
			myDate=myDate.split("-"); 
			dateM=myDate[1];
			var finalMonth=monthConvert(dateM);
			var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
		        console.log("I'm inside Root Message Div");
		        rootmessage +='<div class="rootborder">';
			rootmessage +='<div class="root-header"><a href="'+discussionresult.messages.root.resources.html.ref+'" target="_apps">'+discussionresult.messages.root.subject+'</a></div>';
			rootmessage +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+response.data.author.username+'>'+response.data.author.name+'</a> on '+newDate+'</div>';	
			rootmessage +='<span class="root">'+discussionresult.messages.root.content.text+'</span>';                                        
                        rootmessage +='</div>';				
			rootmessage +='</div>';
		
			var request = response.data.messages.get();
			request.execute(function(response) {
			var result = response.data;
				if(!response.error) {
					
				    $.each(result, function(index, row) {
							console.log("Expanding discussion container response is " + JSON.stringify(response.data));
							var count=0;
							if(row.answer){
									myDate=row.creationDate.substr(0,10);                  
									myDate=myDate.split("-"); 
									dateM=myDate[1];
									var finalMonth=monthConvert(dateM);
									var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
									console.log("I'm inside expand if");
									correctanswer +='<div class="answerborder">';								
									correctanswer +='<div class="correct">Correct Answer</div> ';									
									correctanswer +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a> on '+newDate+'</div>';									
									correctanswer +='<span class="root">'+row.content.text+ '</span>';								
									correctanswer +='</div>';
							
							  }
							  if(row.helpful){
									myDate=row.creationDate.substr(0,10);                  
									myDate=myDate.split("-"); 
									dateM=myDate[1];
									var finalMonth=monthConvert(dateM);
									var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
									console.log("I'm inside expand if");
									helpfulanswer +='<div class="answerborder">';							
									helpfulanswer +='<div class="helpful">Helpful Answer </div>';								
									helpfulanswer +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a> on '+newDate+'</div>';									
									helpfulanswer +='<span class="root">'+row.content.text+ '</span>';								
									helpfulanswer +='</div>';
							
							  }
					
					   });
					discussionMessage +=rootmessage;
					discussionMessage +=correctanswer;
					discussionMessage +=helpfulanswer;
					discussionMessage +=feedbackText;
					console.log("Html Content:: "+discussionMessage);
					$(".content").show();
					$(".content").html(discussionMessage);
				
				   }
			
			});
		
		}

	});

}


//function for expand button to display the documents
function expandDocument(id){
	
       //  $('#div_'+id).css({"background-color":"#F2F2F2","background-repeat": "no-repeat"});
		console.log("You are in document section id ::"+id);
		var request = osapi.jive.core.documents.get({id: id});
		var documentdata="";
		request.execute(function(response) { 
		               console.log("Expanding document response is " + JSON.stringify(response.data));
		               var discussionresult=response.data;
		               var isBinaryDoc=0;
		               var myDate="";
		    try {
			if (response.data.content.binary.ref) {
				isBinaryDoc = 1;
	                }
			else {
				isBinaryDoc = 0;
			}	
		    }
		    catch (err) {
			isBinaryDoc = 0;
		    }
		
		        if (response.error) {
				console.log("Error in get: "+response.error.message);
			}
			else{
				if(isBinaryDoc !=0)
				  {       
				        myDate=response.data.creationDate.substr(0,10);                  
			                myDate=myDate.split("-"); 
			                dateM=myDate[1];
					var finalMonth=monthConvert(dateM);
					var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
					documentdata += '<div class="rootborder">';
					documentdata += '<span class="root-header"><a href="'+response.data.resources.html.ref+'" target="_app">';						
					documentdata += response.data.subject+'</a></span>';
					documentdata +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+response.data.author.username+'>'+response.data.author.name+'</a> on '+newDate+'</div></div>';				
					documentdata += '<div class="answerborder">';
					documentdata +='<span class="root">'+response.data.content.binary.description+'</span>';
					documentdata += '<span class="subtext">This document contains an uploaded document (PDF/DOC). ';
					documentdata += 'Please click <a target="_app" href="'+response.data.resources.html.ref+'">here</a> to open the document</span></div>';
					documentdata +='</div>';
					documentdata += feedbackText; 
				  }
				  else
				  {
					myDate=response.data.creationDate.substr(0,10);                  
			                myDate=myDate.split("-"); 
			                dateM=myDate[1];
				        var finalMonth=monthConvert(dateM);
					var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 
					documentdata +='<div class="rootborder">';					
					documentdata +='<span class="root-header"><a target="_app" href="'+response.data.resources.html.ref+'">';
					documentdata += response.data.subject+'</a></span>';
					documentdata +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+response.data.author.username+'>'+response.data.author.name+'</a> on '+newDate+'</div>';
					documentdata +='</div>';					
					documentdata +='<div class="answerborder">';
					documentdata +='<span class="root">'+response.data.content.text +'</span></div>';				
                                        documentdata += feedbackText;                         
				  }
			    }
			    $(".content").show();
			    $(".content").html(documentdata);
		  });
}

//function for expand button to display the blog
function expandBlog(blogId, blogpostId){
	var postId=blogpostId;
	var finalpostId=postId.substr(0,postId.indexOf('/'))
	console.log("Inside Blog expand");
	var blogdata="";
	var request = osapi.jive.core.blogs.get({id:blogId});
		request.execute(function(response) {
		console.log("Blog Post is"+JSON.stringify(response.data));
		var request = response.data.posts.get();
			request.execute(function(response) {
				console.log("Posts in blog"+JSON.stringify(response.data));
				var result = response.data;
				if(!response.error) {
				   $.each(result, function(index, row) {
			           if(finalpostId.indexOf(row.id) != -1)
				     {
				       var postresult=row.get();
				       postresult.execute(function(response) {
				       console.log("Post Post is"+JSON.stringify(response.data));
				       if (response.error) {
					   console.log("Error in get: "+response.error.message);
				        }
				      else{
				          myDate=response.data.creationDate.substr(0,10);                  
                                          myDate=myDate.split("-"); 
                                          dateM=myDate[1];
			                  var finalMonth=monthConvert(dateM);
				          var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 			    
					  blogdata +='<div class="rootborder">';
				          blogdata +='<span class="root-header"><a target="_app" href="'+response.data.resources.html.ref+'">';
					  blogdata += response.data.subject+'</a></span>';
					  blogdata +='<div class="content-date"> by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+response.data.author.username+'>'+response.data.author.name+'</a> on '+newDate+'</div>';
					  blogdata +='</div>';							
					  blogdata +='<div class="answerborder">';
					  blogdata +='<span class="root">'+response.data.content.text +'</span></div>';	
						blogdata += feedbackText;
					}
					  $(".content").show();
					  $(".content").html(blogdata);
				   });


			        }


			    });

			}

		});
	});

}
function showPage(page,type,navigate)
{
$('.firstdiv').css('background-color', '#FFFFFF');
$(".content").hide();
 //$(".maindiv").hide();
 var pagecounter=0;
  var selectedPage="";
  var totalPage=0;
 pagecounter=page;
 console.log("page outside::"+pagecounter);
 console.log("Navigate type:::"+navigate+ " page :::"+page+" type:::"+type);
 var attlink="";
 var getType="";
 var firstIndex=0;
 var lastIndex=0;
 var naviNextCheck=false;
 var naviPrevCheck=false;
if(type=="discussion")
{
totalPage=total_page_discussion;
getType="getDiscussion";
lastIndex=total_page_discussion-1;
}
else if(type=="document")
{
totalPage=total_page_document;
getType="getDocument";
lastIndex=total_page_document-1;
}
else if(type=="blog")
{
totalPage=total_page_blog;
getType="getBlog";
lastIndex=total_page_blog-1;
}
else
{
totalPage=total_page_all;
getType="getAll";
lastIndex=total_page_all-1;
}
if(navigate=="next")
 {
pagecounter=pagecounter+1;
if(pagecounter==totalPage)
{
$('a#'+type+'_pagingControls').removeAttr('href');
naviNextCheck=true;
}
console.log("Page counter value:::"+pagecounter);
 }else{
pagecounter=pagecounter-1;
if(pagecounter<=1)
{
$('a#'+type+'_pagingControls').removeAttr('href');
naviPrevCheck=true;
}
console.log("Page counter value inside previous:::"+pagecounter);
 }

 console.log("Page counter value before class:::"+pagecounter);
 selectedPage=".div_page_"+type+"_"+pagecounter;
 console.log("Inside show page:::"+selectedPage +"Total Page::"+totalPage);
 for (var i = 1; i <=totalPage; i++) {
      if(i==pagecounter)
{
console.log("Inside show if" +i);
$('.div_page_'+type+'_'+i).css('display', 'block');
//$(selectedPage).show();
//$(".maindiv").show();
}
else
{
console.log("Inside hide else" +i);
$('.div_page_'+type+'_'+i).css('display', 'none');
//$('.div_page_'+type+'_'+i).hide();
}
    }
var next=pagecounter;
var prev=pagecounter;
if(naviNextCheck)
{
console.log("Iam in navinextcheck");
attlink='<a href="#" onClick="return showPage(2,'+getType+',\'previous\');"><span class="jive-icon-med jive-icon-first"></span></a><a href="#" onClick="return showPage('+prev+','+getType+',\'previous\');"><span class="jive-icon-med jive-icon-previous"></span></a>Page:'+pagecounter+'/'+totalPage+'<span class="jive-icon-med jive-icon-next-disabled"></span><span class="jive-icon-med jive-icon-last-disabled"></span>'
}
else if(naviPrevCheck)
{
console.log("Iam in naviprevcheck");
attlink='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:'+pagecounter+'/'+totalPage+'<a href="#" onClick="return showPage('+next+','+getType+',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+','+getType+',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}
else
{
console.log("Iam in else check");
attlink='<a href="#" onClick="return showPage(2,'+getType+',\'previous\');"><span class="jive-icon-med jive-icon-first"></span><a href="#" onClick="return showPage('+prev+','+getType+',\'previous\');"><span class="jive-icon-med jive-icon-previous"></span></a>Page:'+pagecounter+'/'+totalPage+'<a href="#" onClick="return showPage('+next+','+getType+',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+','+getType+',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}

 //$('#'+type+'_pagingControls').html('<div><a href="#" onClick="'return showPage(pagecounter-1,type,\'previous\');"><span class="jive-icon-med jive-icon-previous-disabled"></span></a>Page:'+pagecounter+'/'+total_page_discussion+'<a href="#" onClick="'return showPage(pagecounter+1,type,\'next\');"><span class="jive-icon-med jive-icon-next"></span></a></div>' );
$('#'+type+'_pagingControls').html(attlink);
}
// Perform a search and display the results
function search() {
    
    $("search-results").html("");
	$(".content").html("");
	$(".content").hide();
    gadgets.window.adjustHeight();
	var html = "";
	var myGroups =[];

    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
     
        
    };

   
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
           
			var all="";
			var blog="";
			var discussion="";
			var update="";
			var document="";
			var post="";
			
            var rows = response.data;
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
            var createdDate="";           
            var replyCount="";
            var likeCount="";
            var type="";
            var username="";
            var myDate="";
			var isAnswered = 0;
			var isQuestion = 0
			var intial_discussion=1;
			var intial_document=1;
			var intial_blog=1;
			var intial_all=1;
			var loop_check_discussion=0;
			var loop_check_document=0;
			var loop_check_blog=0;
			var loop_check_all=0;
			var items_per_page =5;
			var newcontent = '';
			var page_index=0;
			var page="";
			var discussion_name="discussion";
			var display_discussion="display:block";
			var display_document="display:block";
			var display_blog="display:block";
			var display_all="display:block";
			var paginate_discussion='<li><a href="#" onclick="showPage(1,\'discussion\'); return false;">1</a></li>';
			var paginate_document='<li><a href="#" onclick="showPage(1,\'document\'); return false;">1</a></li>';
			var paginate_blog='<li><a href="#" onclick="showPage(1,\'blog\'); return false;">1</a></li>';
			var paginate_all='<li><a href="#" onclick="showPage(1,\'all\'); return false;">1</a></li>';
			var typeImage="";
			var mainId="";
            $.each(rows, function(index, row) {
            	url=row.resources.html.ref;
				subject=row.subject;
               	contentSummary=row.contentSummary;
                author=row.author.name;
                createdDate=row.creationDate;                   
                likeCount=row.likeCount;
                replyCount=row.replyCount;
                type=row.type;
                avatar=row.author.avatarURL;
                username=row.author.username;
				
				try {
					if (row.question) {
						isQuestion = 1;
					}
					else {
						isQuestion = 0;
					}	
				}
				catch (err) {
					isQuestion = 0;
				}
				
				try {
					if (row.resources.answer.ref) {
						isAnswered = 1;
					}
					else {
						isAnswered = 0;
					}	
				}
				catch (err) {
					isAnswered = 0;
				}
                myDate=row.modificationDate.substr(0,10);                  
                myDate=myDate.split("-"); 
                dateM=myDate[1];
				var finalMonth=monthConvert(dateM);
				var newDate=finalMonth+" "+myDate[2]+","+myDate[0];
				var allId = (row.resources.self.ref.substring(row.resources.self.ref.lastIndexOf("/"))).substr(1);
				
				if(row.type=="discussion"){
					mainId="all_"+allId;
						
					if(isQuestion)
					{
					if(isAnswered != 0){
					typeImage ='<span class="jive-icon-med jive-icon-discussion-correct"></span>';
									
					 }
					 else
					 {
					  typeImage ='<span class="jive-icon-med jive-icon-discussion-question"></span>';
					  }						
					}
							
						 else
					{
					  typeImage ='<span class="jive-icon-med jive-icon-discussion"></span>';
					}
				}else if(row.type=="document"){
				
					typeImage ='<span class="jive-icon-med jive-icon-document"></span>';
					mainId="all_DOC-"+allId;
				}else if(row.type=="post"){
					var postDetailsId=row.resources.self.ref;
					var blogSummaryId=row.blogSummary.resources.self.ref;
					var blogId = (blogSummaryId.substring(blogSummaryId.lastIndexOf("/"))).substr(1);
					var postId = (postDetailsId.substring(postDetailsId.lastIndexOf("/"))).substr(1);
					allId=postId;
					typeImage ='<span class="jive-icon-med jive-icon-blog"></span>';
					mainId="all_post-"+postId+"/"+blogId;
				}
				console.log("intial_all value "+intial_all);
				console.log("loop_check_all value "+loop_check_all +"items_per_page  "+items_per_page);
				if((loop_check_all>=items_per_page)&& (loop_check_all%items_per_page==0))
					{
						console.log("Inside All If value ");
						
						intial_all=intial_all+1;
						display_all="display:none";
						paginate_all += '<li><a href="#" onclick=showPage("'+ intial_all + '","all"); return false;>' + intial_all + '</a></li>';
					}
					else
					{
						console.log("Inside All else value ");
						intial_all=intial_all;
					}
					var page="page_all_"+intial_all;
				
						if(row.type!="update"){
							all +='<div id="alldiv_'+allId+'" class="firstdiv" >'; 
							all +='<div class="div_'+page+'" style="'+display_all+'">';	
							all +='<ul>';			
				            all +=typeImage+'<li><a href="'+url+'" target="_apps">'+subject+'</a></li>';			
                            all +='</ul>';
                            all +='<ul>';
				            all +='<span class="jive-icon-med image-button " id="'+mainId+'"></span>';
                    		all +='</ul>'; 
					
				            all +='<div class="root1">';  
                    		all +='<ul>';                   
                    		all +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
				            all +='&nbsp;&nbsp<li>Date:'+newDate+'</li>';                    
                    		all +='&nbsp;&nbsp<li>Replies:'+replyCount+'</li>'; 
                    		all +='</ul>';
				            all +='</div>';
					
				            all +='<div class="root">';
                            all +='<ul>';                   
                   		    all +='<div class="align">'+contentSummary+'</div>';                  
                    	    all +='</ul>';
							all +='</div>';				                
							all +='</div>';
							all +='</div>';
							loop_check_all=loop_check_all+1
							}	//discussion +='<br>';
					
                        if(row.type=="discussion"){
						
								
								var discussionID = (url.substring(url.lastIndexOf("/"))).substr(1);
								var discussionImage="";
								if(isQuestion)
								{
								if(isAnswered != 0){
								discussionImage +='<span class="jive-icon-med jive-icon-discussion-correct"></span>';
												
								 }
								 else
								 {
								  discussionImage +='<span class="jive-icon-med jive-icon-discussion-question"></span>';
								  }						
								}
										
									 else
								{
								  discussionImage +='<span class="jive-icon-med jive-icon-discussion"></span>';
								}
								
								console.log("intial_discussion value "+intial_discussion);
								console.log("loop_check_discussion value "+loop_check_discussion +"items_per_page  "+items_per_page);
								
								if((loop_check_discussion>=items_per_page)&& (loop_check_discussion%items_per_page==0))
								{
									console.log("Inside If value ");
									
									intial_discussion=intial_discussion+1;
									display_discussion="display:none";
									//paginate +="<li><a href='#' onclick='showPage(i); return false;'>"+i+"</li>";	
									paginate_discussion += '<li><a href="#" onclick=showPage("'+ intial_discussion + '","discussion"); return false;>' + intial_discussion + '</a></li>';
								}
								else
								{
									intial_discussion=intial_discussion;
								}
								var page="page_discussion_"+intial_discussion;
								console.log(page);
								console.log(paginate_discussion);
								
								discussion +='<div id="div_'+discussionID+'" class="firstdiv" >'; 
								discussion +='<div class="div_'+page+'" style="'+display_discussion+'">';								
								discussion +='<ul>';					
				                discussion +=discussionImage+'<li><a href="'+url+'" target="_apps">'+subject+'</a></li>';			
                                discussion +='</ul>';
                                discussion +='<ul>';
				                discussion +='<span class="jive-icon-med image-button " id="'+discussionID+'"></span>';
                    		    discussion +='</ul>'; 
					
				             discussion +='<div class="root1">';  
                    		discussion +='<ul>';                   
                    		discussion +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
				            discussion +='&nbsp;&nbsp<li>Date:'+newDate+'</li>';                    
                    		discussion +='&nbsp;&nbsp<li>Replies:'+replyCount+'</li>'; 
                    		discussion +='</ul>';
				             discussion +='</div>';
					
				                discussion +='<div class="root">';
                                discussion +='<ul>';                   
                   		        discussion +='<div class="align">'+contentSummary+'</div>';                  
                    	        discussion +='</ul>';
								discussion +='</div>';				                
								discussion +='</div>';
								discussion +='</div>';
								//discussion +='<br>';
								loop_check_discussion=loop_check_discussion+1
								
                        }
						total_page_discussion = intial_discussion;
               
						if(row.type=="document"){
						
							var docID = (url.substring(url.lastIndexOf("-"))).substr(1);
							
							console.log("intial_document value "+intial_document);
								console.log("loop_check_document value "+loop_check_document +"items_per_page  "+items_per_page);
								
								if((loop_check_document>=items_per_page)&& (loop_check_document%items_per_page==0))
								{
									console.log("Inside If value ");
									
									intial_document=intial_document+1;
									display_document="display:none";
									//paginate +="<li><a href='#' onclick='showPage(i); return false;'>"+i+"</li>";	
									paginate_document += '<li><a href="#" onclick=showPage("'+ intial_document + '","document"); return false;>' + intial_document + '</a></li>';
								}
								else
								{
									intial_document=intial_document;
								}
								var page="page_document_"+intial_document;
								console.log(page);
								console.log(paginate_document);
                    		document +='<div id="div_'+docID+'" class="firstdiv"> ';
							document +='<div class="div_'+page+'" style="'+display_document+'">';	
							document +='<ul>';
                    		document +='<span class="jive-icon-med jive-icon-document"></span><li> <a href="'+url+'" target="_apps">'+subject+'</a></li>';
                    		document +='</ul>';
                    		document +='<ul>';
							document +='<span class="jive-icon-med image-button" id="DOC-'+docID+'" ></span>';
                    		document +='</ul>';
                    
							document +='<div class="root1">'; 
                    		document +='<ul>';
							document +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
							document +='&nbsp;&nbsp<li>Date:'+newDate+'</li>';                  
                    		document +='&nbsp;&nbsp<li>Replies:'+replyCount+'</li>';
							document +='</ul>';
                    		document +='</div>';
					
							document +='<div class="root">';
                    		document +='<ul>';                    
                    		document +='<div class="align">'+contentSummary+'</div>';                   
                    		document +='</ul>';
							document +='</div>';
                                       
                    		document +='</div>';
							document +='</div>';
                    		//document +='<br>';
							loop_check_document=loop_check_document+1
                      
                        }
						total_page_document = intial_document;
					if(row.type=="post"){
					
							var postDetailsId=row.resources.self.ref;
							var blogSummaryId=row.blogSummary.resources.self.ref;
							var blogId = (blogSummaryId.substring(blogSummaryId.lastIndexOf("/"))).substr(1);
							var postId = (postDetailsId.substring(postDetailsId.lastIndexOf("/"))).substr(1);
							if((loop_check_blog>=items_per_page)&& (loop_check_blog%items_per_page==0))
								{
									console.log("Inside If value ");
									
									intial_blog=intial_blog+1;
									display_blog="display:none";
									//paginate +="<li><a href='#' onclick='showPage(i); return false;'>"+i+"</li>";	
									paginate_blog += '<li><a href="#" onclick=showPage("'+ intial_blog + '","blog"); return false;>' + intial_blog + '</a></li>';
								}
								else
								{
									intial_blog=intial_blog;
								}
								var page="page_blog_"+intial_blog;
							
							post +='<div id="div_'+postId+'" class="firstdiv"> ';
								post +='<div class="div_'+page+'" style="'+display_blog+'">';	
							post +='<ul>';
							post +='<span class="jive-icon-med jive-icon-blog"></span><li><a href="'+url+'" target="_apps">'+subject+'</a></li>';
							post +='</ul>';
							post +='<ul>';
							post +='<span class="jive-icon-med image-button" id="post-'+postId+'/'+blogId+'" ></span>';                            
							post +='</ul>';
                    
							post +='<div class="root1">'; 
							post +='<ul>';
							post +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
							post +='&nbsp;&nbsp<li>Date:'+newDate+'</li>';                  
							post +='&nbsp;&nbsp<li>Replies:'+replyCount+'</li>'; 
							post +='</ul>';
							post +='</div>';
					
							post +='<div class="root">';    
							post +='<ul>';  
							post +='<div class="align">'+contentSummary+'</div>';  
							post +='</ul>';
							post +='</div>'; 
                                    
							post +='</div>';  
							post +='</div>';  
							//post +='<br>';		
							loop_check_blog=loop_check_blog+1;							
							             
					}
					
				total_page_blog = intial_blog;	
                total_page_all = intial_all;             
            }
				
			);
          
			
				
            //console.log(html);
			//all +=discussion;
			//all +="<br>"+document;
			//all +="<br>"+post;
	if(total_page_all==0)
{
paginate_all='<span > No records found</span>'
}
else if(total_page_all==1)
{
paginate_all='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_all+'<span class="jive-icon-med jive-icon-next-disabled"></span><span class="jive-icon-med jive-icon-last-disabled"></span>'
}
else
{
lastIndex=total_page_all-1;
paginate_all='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_all+'<a href="#" onClick="return showPage(1,\'all\',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+',\'all\',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}

all +='<br><div class="pagingControls" id="all_pagingControls">'+paginate_all+'</div>';

feedbackText = '&nbsp;&nbsp;&nbsp;<div><button class="notHelpful" type="button">Post New Discussion</button></div>&nbsp;&nbsp;&nbsp;';
// feedbackText+= '<button id="helpful">Helpful</button>';

console.log("discussion::"+discussion);
console.log("discussion_count::"+total_page_discussion);
$("#tabs-1").html(all);
if(total_page_discussion==0)
{
paginate_discussion='<span > No records found</span>'
}
else if(total_page_discussion==1)
{
paginate_discussion='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_discussion+'<span class="jive-icon-med jive-icon-next-disabled"></span><span class="jive-icon-med jive-icon-last-disabled"></span>'
}
else
{
lastIndex=total_page_discussion-1;
paginate_discussion='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_discussion+'<a href="#" onClick="return showPage(1,\'discussion\',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+',\'discussion\',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}

discussion +='<br><div class="pagingControls" id="discussion_pagingControls">'+paginate_discussion+'</div>';

$("#tabs-2").html(discussion);

if(total_page_document==0)
{
paginate_document='<span > No records found</span>'
}
else if(total_page_document==1)
{
paginate_document='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_document+'<span class="jive-icon-med jive-icon-next-disabled"></span><span class="jive-icon-med jive-icon-last-disabled"></span>'
}
else
{
lastIndex=total_page_document-1;
paginate_document='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_document+'<a href="#" onClick="return showPage(1,\'document\',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+',\'document\',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}

document +='<br><div class="pagingControls" id="document_pagingControls">'+paginate_document+'</div>';
console.log("document::"+document);
$("#tabs-3").html(document);


if(total_page_blog==0)
{
paginate_blog='<span > No records found</span>'
}
else if(total_page_blog==1)
{
paginate_blog='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_blog+'<span class="jive-icon-med jive-icon-next-disabled"></span><span class="jive-icon-med jive-icon-last-disabled"></span>'
}
else
{
lastIndex=total_page_blog-1;
paginate_blog='<span class="jive-icon-med jive-icon-first-disabled"></span><span class="jive-icon-med jive-icon-previous-disabled"></span>Page:1/'+total_page_blog+'<a href="#" onClick="return showPage(1,\'blog\',\'next\');"><span class="jive-icon-med jive-icon-next"></span></a><a href="#" onClick="return showPage('+lastIndex+',\'blog\',\'next\');"><span class="jive-icon-med jive-icon-last"></span></a>'
}
console.log("total no of blog:"+total_page_blog);
post +='<br><div class="pagingControls">'+paginate_blog+'</div>';
$("#tabs-4").html(post);
$("#search-info").show();
gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
