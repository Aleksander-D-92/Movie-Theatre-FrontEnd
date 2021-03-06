const SMALL_CAROUSEL_RESPONSIVE = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 4
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 4
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

const ACTOR_DETAILS_CAROUSEL = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 3
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 2
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 1
    },
    mobile: {
        breakpoint: {max: 480, min: 0},
        items: 1
    }
}
export {SMALL_CAROUSEL_RESPONSIVE, ACTOR_DETAILS_CAROUSEL}
