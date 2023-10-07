window.onload = () => {
    const cleanUp = () => {
        document.querySelectorAll("#not-found").forEach((item) => item.remove())
    }

    const gatherDataBasedOnSubject = (subject, data) => {
        let table = document.createElement('table')
        let tr = document.createElement('tr')

        Object.keys(data[0]).forEach((item, _) => {
            let headerItem = document.createElement('th')
            headerItem.textContent = item.toUpperCase()
            tr.appendChild(headerItem)
        })
        table.appendChild(tr)
        switch(subject) {
            case "devs":
                data.forEach((item) => {
                    let tr = document.createElement('tr')
                    Object.values(item).forEach((value, _) => {
                        let td = document.createElement('td')
                        td.textContent = value
                        tr.appendChild(td)
                    })
                    table.appendChild(tr)
                })
                return table
            default:
                return null
        }
    }

    const message404 = () => {
        let h2 = document.createElement('h2')
        h2.id = "not-found"
        h2.textContent = "Oops, parece que não temos esse dado ainda :("
        return h2
    }

    const renderNotFound = () => {
        let iFrame = document.createElement('iframe')
        iFrame.src = "https://giphy.com/embed/l2JhORT5IFnj6ioko"
        iFrame.id = "not-found"
        iFrame.width = "480"
        iFrame.height = "198"
        iFrame.className = "giphy-embed"
        return iFrame
    }

    const listRequestedData = (choice) => {
        const LAST_CHILD_BEFORE_DATA = "input#search"
        fetch(`./data/${choice}.json`)
            .then(res => res.json())
            .then(data => {
                sessionStorage.setItem('data', JSON.stringify(data))
                const tableOfContents = gatherDataBasedOnSubject(choice, data)
                document.querySelector(LAST_CHILD_BEFORE_DATA).after(tableOfContents)
                cleanUp()
            })
            .catch(() => {
                const missingItem = renderNotFound()
                const missingMessage = message404()
                document.querySelector(LAST_CHILD_BEFORE_DATA).after(missingMessage)
                document.querySelector(LAST_CHILD_BEFORE_DATA).after(missingItem)
            })
    }

    document.querySelector('select#first-step').addEventListener('change', (e) => {
        listRequestedData(e.target.value)
    })
    document.querySelector('input#search').addEventListener('keyup', (e) => {
        searchItem(e.target.value)
    })
}