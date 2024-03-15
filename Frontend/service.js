const apiUrl = 'http://localhost:3000';

// Login
var email = document.getElementById('email');
var password = document.getElementById('password');
var bandera_email = false;
var btn_login = document.getElementById('btn_login');
var userEmail = document.getElementById('userStorage');

// Budguet
var budget = document.getElementById('budget');
var vlunit = document.getElementById('vlunit');
var cant = document.getElementById('cant');
var types = document.getElementById('types');
var supplier = document.getElementById('supplier');
var unit = document.getElementById('unit');   
var doc = document.getElementById('doc');       
var date = document.getElementById('date');  
var state = document.getElementById('state');  
var proccess = document.getElementById('proccess');
var proccesscol =  document.getElementById('proccesscol');
var btn_create = document.getElementById('create');
var btn_edit =  document.getElementById('edit');
var searchdata =  document.getElementById('search');
var searchtype =  document.getElementById('searchtype');
var searchtypehistory =  document.getElementById('searchtypehistory');
var idData = 0;
var band_history = false;
var band_budgest = false;
var band_edit = false;
var band_date = false;
var fecha = new Date().toISOString().split('T')[0];

//Servicios y supplier
var nameservice =  document.getElementById('nameservice');
var ulrUpdateEdit = '';

document.addEventListener('DOMContentLoaded', loadfuntion);

function loadfuntion(event){
    var url = window.location.href;
    var segmentos = url.split('/'); 
    if (segmentos[segmentos.length - 1] != 'inicio.html' && localStorage.getItem('user') == null){
        window.location.href = './inicio.html'; 
    }else {
        var boton = document.getElementById('new');  
        if(userEmail) {
            userEmail.innerText = localStorage.getItem('user');
        }       
        if (segmentos[segmentos.length - 1] == 'sesion.html'){
            listServices(0);
            listSupplier(0);
            listUnits(0);
            listBudget(event);
            band_budgest = true;
            band_history = false;
            boton.addEventListener('click', function() {
                clear();
                if(band_history ==  true){
                    disabled(false);
                }       
            });
            date.setAttribute('max', fecha);
            date.setAttribute('min', '1900-01-01');
        }else if (segmentos[segmentos.length - 1] == 'services.html'){
            listServices(1);       
            listUnits(1);
            boton.addEventListener('click', function() {
                nameservice.value =""; 
            });
            
        }else if (segmentos[segmentos.length - 1] == 'supplier.html'){ 
            listSupplier(1); 
            boton.addEventListener('click', function() {
                nameservice.value =""; 
            });
        }  
    }
}

function login(event){ 
    event.preventDefault();  
    $.ajax({
        url: apiUrl+"/login",
        method: "POST",
        dataType: "json",
        data: {
            "email": email.value, 
            "password": password.value
        },
        success: function (response) {
            if(response.success == 1 && response.token != null && response.token != ""){
                localStorage.setItem('user', email.value);
                window.location.href = './sesion.html';
            }else{
                Swal.fire({
                    title: "Error de sesión",
                    text: response.data,
                    icon: "error"
                });
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function deleteStorage(){
    localStorage.removeItem('user');
    window.location.href = './inicio.html';
}

function listServices(opc){
    $.ajax({
        url: apiUrl+"/type/get-all",
        method: "GET",
        dataType: "json",
        data: [],
        success: function (response) {
            if(opc == 0){
                selectOption(response.data, 'types');
            }else{
                tableSelectOption(response.data, 'tableServiceBody',"/type/")
            }                             
        },
        error: function (error) {
            console.log(error)
        }
    }); 
}

function listSupplier(opc){
    $.ajax({
        url: apiUrl+"/suppliers/get-all",
        method: "GET",
        dataType: "json",
        data: [],
        success: function (response) {
            if(opc == 0){
                selectOption(response.data, 'supplier');
            }else{
                tableSelectOption(response.data, 'tableServiceBody',"/suppliers/")
            }   
        },
        error: function (error) {
            console.log(error)
        }
    }); 
}

function listUnits(){
    $.ajax({
        url: apiUrl+"/units/get-all",
        method: "GET",
        dataType: "json",
        data: [],
        success: function (response) {
            selectOption(response.data, 'unit');            
        },
        error: function (error) {
            console.log(error)
        }
    }); 
}

function selectOption(array, id){
    var element = document.getElementById(id);
    if(element){
        for (let i = 0; i < array.length; i++) {
            var option = document.createElement('option');
            option.value = array[i]['id'];
            option.innerText= array[i]['name'];
            element.appendChild(option)                
        }   
    }
}

function listBudget(event){
    event.preventDefault();
    $.ajax({
        url: apiUrl+"/butgets/get-all",
        method: "GET",
        dataType: "json",
        data: {"search": searchdata.value, "type": searchtype.value},
        success: function (response) {
            var array = response.data;
            table(array, 'budgest');
            band_budgest = true;
            band_history = false;
        },
        error: function (error) {
            console.log(error)
        }
    });  
}

function listBudgetHistory(){
    $.ajax({
        url: apiUrl+"/history/get-all",
        method: "GET",
        dataType: "json",
        data: {'search': searchdata.value, 'type': searchtypehistory.value},
        success: function (response) {
            var array = response.data;
            table(array, 'history');
            band_budgest = false;
            band_history = true;
        },
        error: function (error) {
            console.log(error)
        }
    });  
}

function createBudget(event){ 
    idData = '';
    event.preventDefault();  
    $.ajax({
        url: apiUrl+"/butgets/create",
        method: "POST",
        dataType: "json",
        data: {
            "budget": budget.value, 
            "val_unit": parseInt(vlunit.value),
            "cant": parseInt(cant.value), 
            "id_type_service": types.value,
            "id_suppliers": supplier.value, 
            "id_unit": unit.value,
            "documentation": doc.value,
            "date": date.value,
            "state": state.value
        },
        success: function (response) {
            listBudget(event);
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function createTypeService(event){ 
    idData = '';
    event.preventDefault();  
    $.ajax({
        url: apiUrl+"/type/create",
        method: "POST",
        dataType: "json",
        data: {
            "name": nameservice.value, 
        },
        success: function (response) {
            location.reload();
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function createSupplier(event){ 
    idData = '';
    event.preventDefault();  
    $.ajax({
        url: apiUrl+"/suppliers/create",
        method: "POST",
        dataType: "json",
        data: {
            "name": nameservice.value, 
        },
        success: function (response) {
            location.reload();
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function viewHistory(event, id){ 
    idData = id;
    event.preventDefault();      
    $.ajax({
        url: apiUrl+"/history/"+id,
        method: "GET",
        dataType: "json",
        data: [],
        success: function (response) {
            openModal(response.data[0]);
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function deleteBudget(event, id){
    event.preventDefault();  
    Swal.fire({
        title: "Está seguro que desea eliminar?",
        text: "No podrá revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: apiUrl+"/butgets/delete/"+id,
                method: "DELETE",
                dataType: "json",
                data: {},
                success: function (response) {
                   Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado",
                    icon: "success"
                  });
                  location.reload();
                },
                error: function (error) {
                    console.log(error)
                }
            });           
        }
      }); 
}

function deleteTypeSupplier(event, id, url){
    event.preventDefault();  
    Swal.fire({
        title: "Está seguro que desea eliminar?",
        text: "No podrá revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: apiUrl+url+"delete/"+id,
                method: "DELETE",
                dataType: "json",
                data: {},
                success: function (response) {
                    if (response.success == 1){
                        Swal.fire({
                            title: "Eliminado!",
                            text: "El registro ha sido eliminado",
                            icon: "success"
                        });
                    }else{
                        Swal.fire({
                            title: "Error",
                            text: response.message,
                            icon: "error",

                        });
                    }   
                    if(response){ if (url == '/type/') {listServices(1) }else{ listSupplier(1);}}             
                },
                error: function (error) {
                    Swal.fire({
                        title: "Error",
                        text: "El registro está asociado a otros datos.",
                        icon: "error",
                        
                    });
                }
            });           
        }
      }); 
}

function updateBudget(event, id){ 
    idData = id;
    band_edit = true;
    event.preventDefault();      
    $.ajax({
        url: apiUrl+"/butgets/update/"+id,
        method: "PUT",
        dataType: "json",
        data: [],
        success: function (response) {
            openModal(response.data1);
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function editBudget(event){
    event.preventDefault();      
    $.ajax({
        url: apiUrl+"/butgets/edit/"+idData,
        method: "PUT",
        dataType: "json",
        data: {      
            "budget": budget.value, 
            "val_unit": vlunit.value,
            "cant": cant.value, 
            "id_type_service": types.value,
            "id_suppliers": supplier.value, 
            "id_unit": unit.value,
            "documentation": doc.value,
            "date": date.value,
            "state": state.value
        },
        success: function (response) {
            $('#exampleModal').modal('hide');
            listBudget(event);
            clear();
        },
        error: function (error) {
            console.log(error)
        }
    });  
}

function updateTypeSupplier(event, id, url){ 
    event.preventDefault();
    ulrUpdateEdit = url
    idData = id;
    $.ajax({
        url: apiUrl+url+id,
        method: "GET",
        dataType: "json",
        data: [],
        success: function (response) {
            if(response){
                $('#serviceModal').modal('show'); 
                nameservice.value = response.data[0].name;
                btn_edit.style.display = 'inline';
                btn_create.style.display = 'none';
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function editTypeSupplier(event){
    event.preventDefault();
    $.ajax({
        url: apiUrl+ulrUpdateEdit+"update/"+idData,
        method: "PUT",
        dataType: "json",
        data: {"name": nameservice.value},
        success: function (response) {
            location.reload();
            btn_edit.style.display = 'none';
            btn_create.style.display = 'inline';
        },
        error: function (error) {
            console.log(error)
        }
    });
}

function openModal(response){  
    fechaFormateada = formatdate(response.date)
    budget.value = response.budget
    vlunit.value = response.val_unit
    cant.value = response.cant
    types.value = response.id_type_service
    supplier.value = response.id_suppliers
    unit.value = response.id_unit
    doc.value = response.documentation
    date.value = fechaFormateada;
    state.value = response.state;
    if (band_edit == true) 
    { btn_create.style.display ='none'; btn_edit.style.display ='inline';} 
    else{ btn_create.style.display ='inline'; btn_edit.style.display ='none';}
    if (band_history == true){
        proccess.value = response.process; 
        disabled(true);
    }   
    $('#exampleModal').modal('show');
}

function changeStatus(id, event){
    idData = id;
    event.preventDefault();     
    Swal.fire({
        title: "Está seguro que desea cambiar estado?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, estoy seguro!"
      }).then((result) => {
        if (result.isConfirmed) { 
            $.ajax({
                url: apiUrl+"/butgets/changestate/"+idData,
                method: "PUT",
                dataType: "json",
                data: {"state": state.value},
                success: function (response) {
                    Swal.fire({
                        title: "Correcto!",
                        text: "El registro ha sido modificado",
                        icon: "success"
                    });
                    listBudget(event);
                },
                error: function (error) {
                    console.log(error)
                }
            });
        }
    });
}

function tableSelectOption(array, tableid, url){
    var html = '';
    for (let i = 0; i < array.length; i++) {
        html = html + '<tr><td>'+ array[i]['id'] + '</td>'+
        '<td>'+array[i]['name']+'</td>'+
        '<td>'+formatdate(array[i]['create_at'])+'</td>'+
        '<td><button class="btn" style="background-color: aqua;" onclick="updateTypeSupplier(event, '+array[i]['id']+',' + url+',)">Edit</button> &nbsp; <button class="btn" style="background-color: red;" onclick="deleteTypeSupplier(event, '+array[i]['id']+','+url+',)">Del</button> &nbsp; </td>'
        +'</tr>';           
    } 
    document.getElementById(tableid).innerHTML = html;
}

function table(array, opc){
    var html = '';
    var htmlbutton = '';
    for (let i = 0; i < array.length; i++) {
        if(array[i]['state'] == '1' && opc != 'history'){
            htmlbutton = '<td><button class="btn" style="background-color: aqua;" onclick="updateBudget(event, '+array[i]['id']+')">Edit</button><button class="btn" style="background-color: red;" onclick="deleteBudget(event, '+array[i]['id']+')">Del</button><button class="btn" style="background-color: yellow;" title="cambiar estado" onclick="changeStatus('+ array[i]['id']+', event)">Act</button> </td>'
        }else{
            htmlbutton = '<td><button class="btn" style="background-color: aqua;" onclick="updateBudget(event, '+array[i]['id']+')">Edit</button><button class="btn" style="background-color: red;" onclick="deleteBudget(event, '+array[i]['id']+')">Del</button><button class="btn" style="background-color: gray;" title="cambiar estado" onclick="changeStatus('+ array[i]['id']+', event)">Inact</button> </td>'
        }
        if(opc == 'history'){
            htmlbutton = '<td><button class="btn" style="background-color: gray;" title="cambiar estado" onclick="viewHistory(event, '+ array[i]['id']+')">Ver</button></td>'
        }
        html = html + '<tr><td>'+ array[i]['id'] + '</td>'+
        '<td>'+array[i]['budget']+'</td>'+
        '<td>'+array[i]['val_unit']+'</td>'+
        '<td>'+array[i]['cant']+'</td>'+
        '<td>'+array[i]['type'].name+'</td>'+
        '<td>'+array[i]['suppliers'].name+'</td>'+
        '<td>'+array[i]['units'].name +'</td>'+
        '<td>'+array[i]['documentation']+'</td>'+
        '<td>'+formatdate(array[i]['date'])+'</td>'+
        '<td>'+formatdate(array[i]['create_at'])+'</td>'+htmlbutton+'</tr>';           
    } 
    document.getElementById('tableBudgetBody').innerHTML = html;
}

function searchData(event){
        listBudget(event);
}

function searchDataHistory(event){
    //console.log($('#').val());
        listBudgetHistory(searchdata.value);
}

// Validaciones
function validEmail(event){
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if(email.value != '' && email.value != null){
        if(validEmail.test(email.value)){
            bandera_email = true;
        }else{
            bandera_email = false;
        }
        validField(event, email , 3, 'login')
    }else{
        validField(event, email , 1, 'login')
    }
}

function validField(event, variable , opc, btn){
    var msg = '';
    var span = document.getElementById('span_'+event.target.name); 
    if (opc == 0) {msg = 'Seleccione una opción valida' } else if (opc == 1){ msg = 'El campo es obligatorio'} else if (opc == 3){ msg = 'Email incorrecto'}  else { msg = 'Fecha incorrecta'}
    if(variable.value == "" || (band_date == true && opc == 2) || (bandera_email == false && opc == 3)){
        variable.style.color = 'red';
        span.innerHTML = msg;
        span.style.display = 'inline';
        span.style.color = 'red';
    }else{
        variable.style.color = '#5068b2';
        span.innerHTML = '';
        span.style.display = 'none';
    } 
    activeButton(btn);
}

function validDate(event){
    if(date.value > fecha || date.value < 1990){
        band_date = true;
    }else{
        band_date = false;
    }
    validField(event, date , 2, '');
}

function activeButton(btn){
    if (btn == 'login'){
        if(email.value != "" && bandera_email == true && password.value != ""){
            btn_login.disabled = false;
        }else{
            btn_login.disabled = true;
        }
    }else if (btn == 'otros'){
        if(nameservice != ""){
            btn_create.disabled = false;
            btn_edit.disabled = false;
        }else{
            btn_create.disabled = true;
            btn_edit.disabled = true;
        }
    }
    else{
        if(state.value != "" && types.value != "" && budget.value != "" && vlunit.value != "" 
        && cant.value != "" && supplier.value != "" && unit.value != "" && doc.value != "" && date.value != "" && band_date == false){
            btn_create.disabled = false;
            btn_edit.disabled = false;
        }else{
            btn_create.disabled = true;
            btn_edit.disabled = true;
        }
    }    
}

// Formatos y limpieza de campos
function formatdate(date){
    var fechaObj = new Date(date);
    var year = fechaObj.getFullYear();
    var month = ('0' + (fechaObj.getMonth() + 1)).slice(-2);
    var day = ('0' + fechaObj.getDate()).slice(-2);
    var fechaFormateada = year + '-' + month + '-' + day;
    return fechaFormateada
}

function disabled(value){
    budget.disabled = value;  types.disabled = value;
    vlunit.disabled = value; supplier.disabled = value;
    cant.disabled = value; unit.disabled = value;
    doc.disabled = value; date.disabled = value;
    state.disabled = value;  btn_create.disabled = value;  btn_edit.disabled = value;
    proccesscol.style.display = value == true ? 'inline': 'none'; 
    proccess.disabled = value;     
}

function clear(event){
    budget.value = ""; vlunit.value = "";
    cant.value = ""; types.value = "";
    supplier.value = ""; unit.value = "";
    doc.value = "";  date.value = ""; 

}

