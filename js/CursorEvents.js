AFRAME.registerComponent("cursor-events", {
    schema: {
        selectedItemId: {default: "", type: "string"}
    },
    init: function () {
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()
        this.handleClickEvents()
    },
    handleMouseEnterEvents: function() {
        this.el.addEventListener("mouseenter", () => {
            this.handlePlacesListState()
        })
    },
    handlePlacesListState: function() {
        const placesId = ["house", "room", "garden"]
        const id = this.el.getAttribute("id")
        if (placesId.includes(id)) {
            const placesContainer = document.querySelector("#places-container")
            placesContainer.setAttribute("cursor-events", {
                selectedItemId: id
            })
            this.el.setAttribute("material", {
                color: "#D76B30",
                opacity: 1
            })
        }
    },
    handleMouseLeaveEvents: function() {
        this.el.addEventListener("mouseleave", () => {
            this.handlePlacesListStateLeave()
        })
    },

    handlePlacesListStateLeave: function() {
        const {selectedItemId} = this.data
        if (selectedItemId) {
            const el = document.querySelector(`#${selectedItemId}`)
            el.setAttribute("material", {
                color: "#000cd4",
                opacity: 0.4
            })
        }
    },
    handleViewState: function() {
        const el = this.el
        const id = el.getAttribute("id")
        const placesContainer = document.querySelector("#places-container")
        const {selectedItemId} = placesContainer.getAttribute("cursor-events")
        const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"]
        if (sideViewPlacesId.includes(id)) {
            placesContainer.setAttribute("tour", {state: "change-view"})
            const skyEl = document.querySelector("#main-container")
            skyEl.setAttribute("material", {src: `./assets/360_images/${selectedItemId}/${id}.jpg`, color: "#fff"})
        }
    },
    handleClickEvents: function() {
        this.el.addEventListener("click", (evt) => {
            const placesContainer = document.querySelector("#places-container")
            const {state} = placesContainer.getAttribute("tour")
            if (state === "places-list") {
                const id = this.el.getAttribute("id")
                const placesId = ["house", "room", "garden"]
                if (placesId.includes(id)) {
                    placesContainer.setAttribute("tour", {
                        state: "view",
                        selectedCard: id
                    })
                }
            }

            if (state === "change-view" || state === "view") {
                this.handleViewState()
            }
        })
    }
  });
  