function desir (elemento){
var desir = document.getElementsByTagName("input")[0].value;
var token = document.getElementsByTagName("input")[1].value;
fetch(token,
  {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: desir,
    }),
  }
)





}
