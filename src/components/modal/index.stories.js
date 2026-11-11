import Modal, { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "."
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import { Icon } from "@/components/icon"
import { H4, Text } from "@/components/typography"

const Header = ({ title = "Edit room", icon }) => (
  <ModalHeader>
    <Flex gap={2} alignItems="center">
      {icon && <Icon name={icon} color="text" />}
      <H4 margin={[0]}>{title}</H4>
    </Flex>
    <ModalCloseButton testId="close-button" onClose={() => {}} />
  </ModalHeader>
)

const Footer = () => (
  <ModalFooter>
    <Flex gap={2}>
      <Button flavour="hollow" label="Cancel" />
      <Button label="Save" />
    </Flex>
  </ModalFooter>
)

export const Basic = args => (
  <Modal {...args}>
    <ModalContent width={120}>
      <Header />
      <ModalBody>
        <Text>Rooms group nodes so you can see their charts and alerts together.</Text>
      </ModalBody>
      <Footer />
    </ModalContent>
  </Modal>
)

export const WithHeaderIcon = () => (
  <Modal>
    <ModalContent width={120}>
      <Header title="Schedule report" icon="clock_hollow" />
      <ModalBody>
        <Text>Reports are emailed every Monday at 09:00 UTC.</Text>
      </ModalBody>
      <Footer />
    </ModalContent>
  </Modal>
)

export const ScrollingBody = () => (
  <Modal>
    <ModalContent width={120} height={{ max: 120 }}>
      <Header title="Nodes" />
      <ModalBody overflow={{ vertical: "auto" }} gap={2}>
        {Array.from({ length: 40 }, (_, i) => (
          <Text key={i}>node-{String(i + 1).padStart(2, "0")}.prod</Text>
        ))}
      </ModalBody>
      <Footer />
    </ModalContent>
  </Modal>
)

export const FooterWithoutBorder = () => (
  <Modal>
    <ModalContent width={120}>
      <Header />
      <ModalBody>
        <Text>hasBorder={"{false}"} removes the footer divider.</Text>
      </ModalBody>
      <ModalFooter hasBorder={false}>
        <Button label="Done" />
      </ModalFooter>
    </ModalContent>
  </Modal>
)

export const ModalWithoutBackdrop = () => (
  <Modal backdrop={false}>
    <ModalContent width={120}>
      <Header />
      <ModalBody>
        <Text>No backdrop: border and shadow alone separate the surface.</Text>
      </ModalBody>
      <Footer />
    </ModalContent>
  </Modal>
)

export const WithBackdropBlur = () => (
  <Modal backdropProps={{ backdropBlur: true }}>
    <ModalContent width={120}>
      <Header />
      <ModalBody>
        <Text>Blur is opt-in through backdropProps.</Text>
      </ModalBody>
      <Footer />
    </ModalContent>
  </Modal>
)

const positionOptions = [
  "top-left",
  "top",
  "top-right",
  "left",
  "center",
  "right",
  "bottom-left",
  "bottom",
  "bottom-right",
]

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

export default {
  title: "Components/Modal",
  component: Modal,
  subcomponents: { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A centered dialog built on Layer: a backdrop plus composable content, header, body and footer parts. Use it for focused tasks that need the user's full attention, such as editing a room or scheduling a report.",
      },
      story: { inline: false, height: "420px" },
    },
  },
  args: {
    position: "center",
    full: false,
    backdrop: true,
    borderShadow: false,
  },
  argTypes: {
    position: prop("Where the modal sits in the viewport.", "string", '"center"', {
      type: "select",
      options: positionOptions,
    }),
    full: prop(
      "Stretch to the full viewport, or only one axis.",
      "boolean | 'vertical' | 'horizontal'",
      "false",
      {
        type: "select",
        options: [false, true, "vertical", "horizontal"],
      }
    ),
    backdrop: prop("Render the scrim behind the modal.", "boolean", "true", "boolean"),
    borderShadow: prop(
      "Apply the shared modal shadow to the layer container.",
      "boolean",
      "false",
      "boolean"
    ),
    margin: prop(
      "Space kept between the modal and the viewport edges, in theme units.",
      "number[]",
      "[]",
      "object"
    ),
    onClickOutside: {
      description: "Called when the backdrop is clicked.",
      control: false,
      action: "onClickOutside",
      table: { type: { summary: "() => void" } },
    },
    onEsc: {
      description: "Called when Escape is pressed.",
      control: false,
      action: "onEsc",
      table: { type: { summary: "() => void" } },
    },
    backdropProps: prop(
      "Props passed to the backdrop element, e.g. { backdropBlur: true }.",
      "object",
      "undefined",
      "object"
    ),
    backdropContainerProps: prop(
      "Props passed to the backdrop container, e.g. a zIndex.",
      "object",
      "undefined",
      "object"
    ),
    dataDrop: prop(
      "Value of the data-drop attribute that marks the layer for outside-click checks.",
      "string",
      '"layer-content"',
      "text"
    ),
    children: {
      description: "Modal parts: ModalContent with header, body and footer.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
  },
}
