let currentTime = new Date()
render(currentTime)

g('#prevMonth').onclick = () => {
    const firstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    render(new Date(firstDayOfCurrentMonth - 86400 * 1000))
}
g('#nextMonth').onclick = () => {
    const nextFirstDayOfCurrentMonth = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 1)
    render(nextFirstDayOfCurrentMonth)
}
g('#today').onclick = () => {
    render(new Date())
}

function g(selector) {
    return document.querySelector(selector)
}
function gs(selector) {
    return document.querySelectorAll(selector)
}

function render(time) {
    const year = time.getFullYear()
    const month = time.getMonth() + 1

    initTime()
    generateDays()
    currentTime = time

    function initTime() {
        const time = g('#time')
        time.textContent = `${year}年${month}月`
    }


    function generateDays() {
        const firstDayOfCurrentMonth = new Date(year, month - 1, 1)
        const weekdayOfFirstDayOfCurrentMonth = firstDayOfCurrentMonth.getDay()
        const lastDayOfCurrentMonth = new Date(new Date(year, month - 1 + 1, 1) - 86400 * 1000)
        const lastDayOfMonth = lastDayOfCurrentMonth.getDate()
        const lastDayOfWeekMonth = lastDayOfCurrentMonth.getDay()

        const days = g('#days')
        days.innerHTML = ""
        let n = 0
        for (let i = 1; i < weekdayOfFirstDayOfCurrentMonth; i++) {
            const li = document.createElement('li')
            const d = new Date(firstDayOfCurrentMonth - 86400 * 1000 * i)
            li.textContent = d.getDate()
            li.classList.add('calendar-days-disabled')
            days.prepend(li)
            n += 1
        }


        const dayOfMonth = lastDayOfMonth
        const now = new Date()
        let selectedLi
        for (let i = 1; i <= dayOfMonth; i++) {
            const li = document.createElement('li')
            li.textContent = i
            if (i === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear()) {
                li.classList.add("calender-days-today")
            }
            li.onclick = () => {
                if (selectedLi) { selectedLi.classList.remove('calendar-days-selected') }
                li.classList.add("calendar-days-selected")
                selectedLi = li
            }
            days.append(li)
            n += 1
        }
        let i = lastDayOfWeekMonth + 1
        for (let j = 0; j < 42 - n; j++) {
            const delta = i - lastDayOfWeekMonth
            const li = document.createElement('li')
            const d = new Date(lastDayOfCurrentMonth - 0 + 86400 * 1000 * delta)
            li.textContent = d.getDate()
            days.append(li)
            li.classList.add('calendar-days-disabled')
            i++
        }
    }

}
