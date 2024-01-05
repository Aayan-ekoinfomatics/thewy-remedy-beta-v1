import { atom } from "recoil"

const cartProductIDs = atom({
    key: 'cartProductIDs',
    default: null,
})

export default cartProductIDs