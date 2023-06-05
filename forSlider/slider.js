window.addEventListener("DOMContentLoaded", () => {
    const [back, next] = document.querySelectorAll("button"); // кнопки управления
    const track = document.querySelector(".track"); // лента слайдов
    const wrapperPoints = document.querySelector(".points"); // обертка для точек навигации
    const widthSlide = track.children[0].offsetWidth; // ширина одного слайда
    let position = widthSlide; // текущая позиция в пикселях
    let boolEvent = true; // индикатор события переключения слайда

    const addPoint = () => { // создание точек навигации и добавление их в обертку
        [...track.children].map((item, i) => {
            const point = document.createElement('div');
            point.classList.add("point");
            point.setAttribute("data-id", i + 1);
            wrapperPoints.append(point);
        });
        wrapperPoints.children[0].classList.add("point_active");
    }

    const replaceActive = (arr, item) => { // переключение активного элемента
        arr.map(item => item.classList.remove("point_active"));
        item.classList.add("point_active");
    }

    const addClone = (arr, itemWrapper) => { // создание клонов первого и последнего слайда
        const first = arr[0].cloneNode(true);
        const last = arr[arr.length - 1].cloneNode(true);
        first.classList.add("clone");
        last.classList.add("clone");
        itemWrapper.prepend(last);
        itemWrapper.append(first);
    }

    const switching = (path) => { // переключение слайдов (-2 - на два слайда назад; 5 - на пять слайдов вперед)
        boolEvent = false;
        let start = position; // начало анимации
        position += path * widthSlide; // конец анимации

        if(position <= 0) { // Реализация кольцевого переключения слайдов (работает только для path = 1 или -1)
            position = track.scrollWidth - widthSlide;
            track.style.transform = `translateX(-${position}px)`;
            start = position;
            position -= widthSlide;
        } else if(position > track.scrollWidth - 2 * widthSlide) {
            position = 0;
            track.style.transform = `translateX(-${position}px)`;
            start = position;
            position += widthSlide;
        }

        replaceActive([...wrapperPoints.children], wrapperPoints.children[position / widthSlide - 1]); // управление активностью точек навигации

        const idTimer = setInterval(() => { // анимация переключения
            start += path * 20; // для корректной работы ширина слайды должна делиться на цело при делении на (path * 20)
            track.style.transform = `translateX(-${start}px)`;
            if(start == position) {
                clearInterval(idTimer);
                boolEvent = true;
            }
        }, 10)
    }

    addPoint(); // создание точек навигации и добавление их в обертку
    addClone(track.children, track); // создание клонов первого и последнего слайда
    track.style.transform = `translateX(-${position}px)`; // задаем начальную позицию слайдера (начальная позиция должна равняться ширине слайда)

    back.addEventListener("click", () => boolEvent? switching(-1): null); // событие нажатия на кнопку управления слайдером
    next.addEventListener("click", () => boolEvent? switching(1): null); // событие нажатия на кнопку управления слайдером

    wrapperPoints.addEventListener("click", (e) => { // событие нажатия на точку навигации слайдера
        if(e.target.classList.contains("point") && !e.target.classList.contains("point_active") && boolEvent) {
            replaceActive([...wrapperPoints.children], e.target);
            switching(e.target.getAttribute("data-id") - position / widthSlide);
        }
    })
})