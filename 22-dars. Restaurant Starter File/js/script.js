window.addEventListener("DOMContentLoaded", () => {
    const shaharNomiBtns = document.querySelectorAll(".shaharNomi"),
        tabContents = document.querySelectorAll(".tab_content")

    
    let isHaveTime = false;
    function gettimer(deadline) {
        let now = new Date();
        let startTime = now.getTime(),
            finishTime = Date.parse(deadline)
        if(finishTime <= startTime) {
            isHaveTime = false
            return;  
        } else {
            isHaveTime = true;
            let betweenTime = Date.parse(deadline) -  now.getTime();
            let day = Math.floor(betweenTime / (1000 * 60 * 60 * 24)),
                hour = Math.floor(betweenTime / (1000 * 60 * 60) % 24),
                minut = Math.floor(betweenTime / (1000 * 60) % 60),
                secund = Math.floor(betweenTime / 1000 % 60)
            
            return {
                betweenTime,
                day,
                hour,
                minut,
                secund,
            };
        }
    };

    function showContents(index = 0) {
        tabContents.forEach( item => item.classList.remove("show"));
        tabContents[index].classList.add("show");
    };

    showContents();

    shaharNomiBtns.forEach( (item, index) => {
        item.addEventListener("click", (e) => {
            shaharNomiBtns.forEach( item => item.classList.remove("active"));
            shaharNomiBtns[index].classList.add("active");     
            showContents(index);
        });
    });

    // loader
    function loader() {
        const loader = document.querySelector(".loaderOver");
        setTimeout( () => {loader.style.display = "none"}, 1500);
    };
    loader();

    //timer
    function timer(celector, vaqt) {
        const timer = document.querySelector(celector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds")
        function updateTime() {
            const time = gettimer(vaqt);
            days.textContent = String(time.day).padStart(2, 0);
            hours.textContent = String(time.hour).padStart(2, 0);
            minutes.textContent = String(time.minut).padStart(2, 0);
            seconds.textContent = String(time.secund).padStart(2, 0);
            if(time.betweenTime <= 0){
                clearInterval(timeInterval);
            };
        };

        updateTime()        
        const timeInterval = setInterval(updateTime, 1000);
    };

    timer(".timer", "2025-04-01")

    // Modal 
    const contactBtns = document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalClosebtn = document.querySelector("[data-modal-close]")
    
    contactBtns.forEach( btn => {
        btn.addEventListener("click", (e) => {
            modal.classList.add("show")
            document.body.style.overflow = "hidden"
            clearTimeout (contactSetTime);
        });
    });

    modalClosebtn.addEventListener("click", () => {
        modal.classList.remove("show")
        document.body.style.overflow = ""
    });

    modal.addEventListener("click", (e) => {
        if(e.target == modal && modal.classList.contains("show")) {
            modal.classList.remove("show")
            document.body.style.overflow = ""
        };
    });

    document.addEventListener("keydown", (e) => {
        if(e.key == "Escape" && modal.classList.contains("show")) {
            modal.classList.remove("show")
            document.body.style.overflow = ""
        };
    })
    const contactSetTime = setTimeout( () => {
        modal.classList.add("show")
        document.body.style.overflow = "hidden"
    }, 5000);

});