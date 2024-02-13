/*
Steiber Zoltán
SZOFT I/3/E
2024-02-13

Kedves Attila!!!
Elnézést...
Nem tudtam itthonról behozni a npm localhost:3000 -et!
Meg tudtam jeleníteni, de hiába írtam be fetch() hez nem hozott be adatot.
Ezért a múltkori órán használt címet használtam fel, 
hogy meg tudjak jeleníteni vmit. A form se lett tökéletes sajnos! 
Valamiért nem tudtam post-olni a new FormData() beépitett object-tel. 
Viszont egyedül csináltam mindent
Remélem azért lesz benne értékelhető :)!
*/

let estUrl = 'https://novenyek-2ac0d-default-rtdb.europe-west1.firebasedatabase.app/ingatlanok.json'
let katUrl = 'https://novenyek-2ac0d-default-rtdb.europe-west1.firebasedatabase.app/kategoriak.json'


function ujratolt() {
  location.reload();
}

// A szerver tartalmat kilistazo fuggveny -----
document.getElementsByClassName('btn btn-dark')[0].onclick = function () {
  let katsArray = [];
  let estArray = [];
  fetch(katUrl)
    .then(res => res.json())
    .then(resJs => {
      katsArray = (Object.entries(resJs))
      console.log(katsArray)
    })


  fetch(estUrl)
    .then(res => res.json())
    .then(resJs => {
      estArray = (Object.entries(resJs))
      console.log(estArray)

      // html table nyitasa -----
      let tableHtml = `
        <button onclick="ujratolt()" type="button" class="btn btn-dark" style="left: 100%">Vissza a kezdő oldalra</button><br><br><br>
        <table class="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Kategória</th>
              <th scope="col">Leírás</th>
              <th scope="col">Hírdetés dátuma</th>
              <th scope="col">Kép</th>
            </tr>
          </thead>
          <tbody>
      `;

      // html table sorai for ciklussal -----
      estArray.forEach(est => {
        let katArray = katsArray.filter(kat => kat[0] == est[1].kategoriaid);
        let katMegnevez = katArray[0][1].megnevezes
        console.log(katMegnevez);

        tableHtml += `
        <tr>
        <td> ${katMegnevez} </td>
        <td> ${est[1].leiras} </td>
        <td> ${est[1].hirdetesDatuma} </td>
        <td><img src=${est[1].kepUrl} alt="kepUrl"></td>
        </tr>
      `
      });

      // html table zarasa -----
      tableHtml += `</tbody ></table > `
      document.getElementById('container').innerHTML = tableHtml

    })
}


// A formot kuldo fuggveny -----
document.getElementsByClassName('btn btn-success')[0].onclick = function () {
  let today = new Date();
  let formattedDate = today.toLocaleDateString('hu', { dateStyle: 'full' });

  let formHtml = `
        <button onclick ="ujratolt()" type = "button" class="btn btn-dark" style = "left: 100%" > Vissza a kezdő oldalra</button > <br><br><br>

          <form id="kuldoForm">
            <fieldset>
              <legend>Add meg az ingatlan adatait</legend>

              <div class="mb-3">
                <label for="textInput" class="form-label">Rögzítés dátuma</label>
                <input type="text" id="textInput" class="form-control" placeholder="${formattedDate}" disabled>
              </div>

              <label for="customRange2" class="form-label">Résztvevők száma</label>
              <input type="range" class="form-range" min="2" max="16" id="customRange2">
              <p>Választható érték: 2 - 16 / értéket nem írja ki :(</p>
              
            
              <div class="mb-3">
                <label for="defaultSelect" class="form-label">Résztvevők száma</label>
                <select id="defaultSelect" class="form-select">
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                  <option>15</option>
                  <option>16</option>
                </select>
              </div>

              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Ingatlan leírása</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="fieldsetCheck">
                    <label class="form-check-label" for="fieldsetCheck">
                      Tehermentes ingatlan
                    </label>
                </div>
              </div>

              <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
              </div>


              <button type="submit" class="btn btn-primary">Submit</button>

            </fieldset>
          </form>
          `
  document.getElementById('container').innerHTML = formHtml;
  document.getElementById('kuldoForm').addEventListener('submit', function (ev) {
    ev.preventDefault();

    let form = ev.target;
    console.log(form)

    let formData = new FormData(form);
    let formDataObj = {};
    formData.forEach(function (ertek, key) {
      formDataObj[key] = ertek
    });
    console.log(formDataObj)
  })

  fetch(estUrl, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(formDataObj)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(er => console.log('Valami hiba történt'))

}