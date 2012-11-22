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
post +='<br><div class="pagingControls" id="document_pagingControls">'+paginate_blog+'</div>';
$("#tabs-4").html(post);