AFRAME.registerComponent("tour", {
  schema: {
    state: {type: "string", default: "places-list"},
    selectedCard: {type: "string", default: "#card1"}
  },
  init: function () {
    this.placesContainer = this.el;
    this.createCards()
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "house",
        title: "Mansion",
        url: "./assets/thumbnails/house.jpg",
      },
      {
        id: "room",
        title: "Room",
        url: "./assets/thumbnails/room.jpg",
      },

      {
        id: "garden",
        title: "Garden",
        url: "./assets/thumbnails/garden.jpg",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id)
      // Thumbnail Element
      const thumbnailEl = this.createThumbnail(item)
      borderEl.appendChild(thumbnailEl)
      // Title Text Element
      const titleEl = this.createTitleEl(position, item)
      borderEl.appendChild(titleEl)

      
      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    let ring = document.createElement("a-entity")
    ring.setAttribute("geometry", {primitive: "ring", radiusInner: 9, radiusOuter: 10})
    ring.setAttribute("id", id)
    ring.setAttribute("visible", true)
    ring.setAttribute("position", position)
    ring.setAttribute("material", {color: "#000cd4", opacity: 0.4})
    ring.setAttribute("cursor-events", {})
    return ring
  },
  createThumbnail: function(item) {
    let thumbnail = document.createElement("a-entity")
    thumbnail.setAttribute("geometry", {primitive: "circle", radius: 9})
    thumbnail.setAttribute("visible", true)
    thumbnail.setAttribute("material", {src: item.url})
    return thumbnail
  },
  createTitleEl: function(position, item) {
    let titleEl = document.createElement("a-entity")
    titleEl.setAttribute("text", {font: "exo2bold", align: "center", width: 60, color: "#e65100", value: item.title})
    const positionEl = position
    positionEl.y = -20
    titleEl.setAttribute("position", positionEl)
    titleEl.setAttribute("visible", true)
    return titleEl
  },
  hideEl: function(elList) {
    //console.log("el list:" + elList)
    elList.map(el => {
      el.setAttribute("visible", false)
    })
  },
  showView: function() {
    const {selectedCard} = this.data
    const skyEl = document.querySelector("#main-container")
    skyEl.setAttribute("material", {src: `./assets/360_images/${selectedCard}/place.jpg`, color: "#fff"})
  }, 
  tick: function() {
    const {state} = this.el.getAttribute("tour")
    if (state === "view") {
      this.hideEl([this.placesContainer])
      this.showView()
    }
  }
  
});
