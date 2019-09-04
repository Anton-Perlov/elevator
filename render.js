function render(){

    let elevatorA = Math.floor(Math.random() * FLOORS) + 1 ; // Исходная позиция лифта

    let myHouseHeight = FLOORS * FLOOR_HEIGHT;

    let myHouse = document.getElementById("fullpage").getElementsByClassName("house");
    let elevatorShafts = myHouse[0].getElementsByClassName("shaft");

    

    myHouse[0].style.height = myHouseHeight + 'px';

    for (let i = 0; i < elevatorShafts.length; i++) {
        elevatorShafts[i].style.height = myHouseHeight + 'px';
    }

    let myFloor = myHouse[0].getElementsByClassName("floor")[0];
    

    //Рисуем этажи:
    for( let floorsIt = 1; floorsIt < FLOORS; floorsIt++){
        myHouse[0].innerHTML += myFloor.outerHTML;
    }

    let floors = myHouse[0].getElementsByClassName("floor");
    let buttonsBlock = document.getElementById("buttonsBlock");
    
    // Расставляем этажи по высоте и делаем кнопки
    for (let i = 0; i < FLOORS; i++) {
        buttonsBlock.innerHTML += "<button class='button elevatorA' value='" + (FLOORS - i) + "'>" + (FLOORS - i) + "</button>"; // Делаем кнопки
        floors[i].getElementsByClassName("floorSign")[0].innerHTML = FLOORS - i; // Расставляем номера этажей
        floors[i].style.top = i * FLOOR_HEIGHT + 'px'; // размечаем этажи по высоте
    }
    
    let elevator = document.getElementsByClassName("elevator")
    elevator[0].style.top = (FLOORS - elevatorA) * FLOOR_HEIGHT + "px"; //Поставим лифт в исходную позицию на первый этаж
    elevator[0].currentFloor = elevatorA;



    let us = Array();

    for (let u = 0; u < USERS_COUNT; u++){
        us[u] = new User(Math.floor(Math.random() * users.length));
        //floors[floors.length - 1].innerHTML  += "<img src='images/" + us[u].Name + "' class='user' style='left: 0px' />";
        myHouse[0].innerHTML  += "<div class='user' style='left: 0px'><img src='images/" + us[u].Name + "' /><span class='wantFloor'>1</span></div>";
    }
    



    // ---------------------------------------------------------------------
    let user = document.getElementsByClassName('user')
    for(let userId = 0 ; userId < user.length; userId++ ){
        user[userId].style.top = (FLOORS - 1) * FLOOR_HEIGHT + "px"
        user[userId].currentFloor = 1;
        user[userId].wantFloor = 1;

        elevator[0].addEventListener('transitionend', function(){

            if(elevator[0].currentFloor == user[userId].wantFloor && user[userId].insideLift == true){
                user[userId].currentFloor = elevator[0].currentFloor;
                user[userId].insideLift = false
                user[userId].getElementsByClassName('wantFloor')[0].style.display = 'none';
                
            }
            if(elevator[0].currentFloor == user[userId].currentFloor && user[userId].currentFloor!=user[userId].wantFloor){
                user[userId].insideLift = true;
                user[userId].wantPos = 400 + 5 * userId;
            }

        });

        

        function makeMove(){
            if(Math.floor(Math.random() * CHANCE)==1){
                user[userId].wantFloor = Math.floor(Math.random() * FLOORS) + 1;
                user[userId].getElementsByClassName('wantFloor')[0].innerHTML = user[userId].wantFloor;
                user[userId].getElementsByClassName('wantFloor')[0].style.display = 'block';
                user[userId].append = user[userId].wantFloor;
                if(elevator[0].currentFloor == user[userId].currentFloor){
                    user[userId].wantPos = 400 + 5*userId;
                    user[userId].insideLift = true;
                }else{
                    user[userId].wantPos = 320 + 5*userId;
                }
                
                
            }else{
                user[userId].wantPos = Math.floor(Math.random() * 300);
            }
        }
        makeMove();

        let pos = parseInt(user[userId].style.left,10);

        let id = setInterval(move, USER_MOOVE_SPEED);
        
        function move(){
            
            if(parseInt(user[userId].style.left, 10) == user[userId].wantPos){
                
                clearInterval(id);

                if(user[userId].currentFloor==user[userId].wantFloor){
                    makeMove();
                }
                id = setInterval(move, USER_MOOVE_SPEED);
                
            }else{
                if(parseInt(user[userId].style.left, 10) <= user[userId].wantPos){
                    pos++;
                }else{
                    pos--;
                }
                user[userId].style.left = pos + 'px'
            }
        }
    }

    // ---------------------------------------------------------------------
 
    // ---------------------------------------------------------------------




    let buttons = document.getElementsByClassName('button')
    // Сделаем кнопки активные и приведем лифт в движение
    for(let butIt = 0 ; butIt < buttons.length; butIt++){
        
        // buttons[butIt].style.width = "30px";

        buttons[butIt].addEventListener('click', mv);

        function mv() {
            
            let moveTo = this.value;
            if(this.classList[1]=="elevatorA"){
                if(elevatorA!= +moveTo){
                    let moveTime = Math.abs(elevatorA - moveTo);
            
                    elevator[0].style.transitionDuration = (moveTime/MOOVE_SPEED) + "s";
                    elevator[0].style.top = (FLOORS * FLOOR_HEIGHT) - (FLOOR_HEIGHT * moveTo) + "px";
                    for(let userId = 0 ; userId < user.length; userId++ ){
                        if(user[userId].insideLift === true){
                            user[userId].style.top = (FLOORS * FLOOR_HEIGHT) - (FLOOR_HEIGHT * moveTo) + "px";
                            user[userId].style.transitionDuration = (moveTime/MOOVE_SPEED) + "s";
                        }
                    }
                    elevatorA = moveTo;
                    elevator[0].currentFloor = elevatorA;
                }

            }

        }
    }
}