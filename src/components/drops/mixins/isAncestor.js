import getAncestors from "./getAncestors"

export default (parent, target) => getAncestors(target).some(node => node === parent)
