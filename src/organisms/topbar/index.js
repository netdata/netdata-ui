import Flex from "@/components/templates/flex"

const Topbar = ({ extended = false, children, mainChild }) => {
  return (
    <Flex justifyContent="between" alignItems="center">
      {mainChild}
      <Flex alignItems="center" gap={extended ? 8 : 5}>
        {children}
      </Flex>
    </Flex>
  )
}

export default Topbar
