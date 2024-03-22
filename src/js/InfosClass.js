import showdown from 'https://cdn.jsdelivr.net/npm/showdown@2.1.0/+esm'

export class Infos {
    #bsOffcanvas
    #id
    #url
    #element
    #converter
    constructor(bsOffcanvas, id, url) {
        this.#bsOffcanvas = bsOffcanvas
        this.#id = id
        this.#element = document.getElementById(id)
        this.#url = url
        this.#converter = new showdown.Converter({ tables: true, strikethrough: true })
    }

    safeById = (id, func) => {
        if (!id) return
        const elem = this.#element.querySelector('#' + id)
        if (!elem) return
        return func(elem)
    }

    feedback(elem) {
        [...this.#element.getElementsByClassName('logic_symbols_OR_javascript_expressions')].forEach(e => e.style.fontWeight = 'normal')
        elem.style.fontWeight = 'bold'
    }

    display(responseText) {
        this.#element.querySelector('.offcanvas-body').innerHTML = this.#converter.makeHtml(responseText);

        this.#element.querySelectorAll('table').forEach(table => {
            table.classList.add('table', 'table-light', 'table-sm', 'table-borderless');
        });

        this.#element.querySelectorAll("img").forEach(img => {
            if (img.alt && !(img.alt.includes('Android') || img.alt.includes('Apple') || img.alt.includes('example') || img.alt.includes('github'))) {
                img.classList.add("img-fluid")
            }
        })

        this.safeById('logic_symbols', elem => {
            elem.addEventListener('click', (clickEvent) => {
                clickEvent.preventDefault()
                this.safeById('body-id', body => body.classList.remove('javascript'))
                this.safeById('AetB', AetB => AetB.innerHTML = "𝖠 ∧ 𝖡")
                this.safeById('AouB', AouB => AouB.innerHTML = "𝖠 ∨ 𝖡")
                this.safeById('nonAounonB', nonAounonB => nonAounonB.innerHTML = "¬𝖠 ∨ ¬𝖡")
                this.feedback(elem)
            })
        })

        this.safeById('javascript_expressions', elem => {
            elem.addEventListener('click', (clickEvent) => {
                clickEvent.preventDefault()
                this.safeById('body-id', body => body.classList.add('javascript'))
                this.safeById('AetB', AetB => AetB.innerHTML = "α & β")
                this.safeById('AouB', AouB => AouB.innerHTML = "α | β")
                this.safeById('nonAounonB', nonAounonB => nonAounonB.innerHTML = "!α | !β")
                this.feedback(elem)
            })
        })

    }

    fetch(callback) {
        const infos = this
        const xhr = new XMLHttpRequest()
        xhr.open("GET", this.#url + "?_=" + Date.now(), true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    infos.display(xhr.responseText);
                    if (callback) callback()
                } else {
                    console.log('nope')
                }
            }
        }
        xhr.send()

        return new this.#bsOffcanvas(this.#element)
    }
}