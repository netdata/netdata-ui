import React from "react"
import ConfirmationDialog from "./confirmation-dialog"

export const Basic = args => <ConfirmationDialog {...args} />

export const Destructive = args => (
  <ConfirmationDialog
    {...args}
    title="Delete node"
    message={
      <span>
        Removes <strong>web-prod-03</strong> and its alert history from this space. This cannot be
        undone.
      </span>
    }
  />
)

export const Positive = args => (
  <ConfirmationDialog
    {...args}
    isConfirmPositive
    confirmLabel="Leave"
    title="Leave space?"
    message="You can rejoin with a new invitation."
  />
)

export const WithMiddleAction = args => (
  <ConfirmationDialog
    {...args}
    title="Delete dashboard"
    message="Delete only this tab, or the whole dashboard?"
    middleLabel="Only this tab"
    handleMiddle={() => {}}
  />
)

export const Loading = args => (
  <ConfirmationDialog {...args} title="Deleting node" isConfirmLoading isDeclineDisabled />
)

export const ConfirmDisabled = args => (
  <ConfirmationDialog {...args} isConfirmDisabled message="Type the node name to confirm." />
)

export const WithoutIcon = args => <ConfirmationDialog {...args} hideIcon />

export const WithoutDecline = args => (
  <ConfirmationDialog {...args} handleDecline={undefined} confirmLabel="Got it" isConfirmPositive />
)

export const LongTitle = args => (
  <ConfirmationDialog
    {...args}
    title="Remove all 128 selected nodes from the production space and every room they belong to"
  />
)

export const WithBackdropBlur = args => (
  <ConfirmationDialog {...args} backdropProps={{ backdropBlur: true }} />
)

const prop = (description, type, defaultValue, control) => ({
  description,
  control,
  table: { type: { summary: type }, defaultValue: { summary: defaultValue } },
})

const callback = (description, name) => ({
  description,
  control: false,
  action: name,
  table: { type: { summary: "(e: SyntheticEvent) => void" } },
})

export default {
  title: "Components/Confirmation Dialog",
  component: ConfirmationDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal that asks the user to confirm or cancel an action. Use it for destructive or irreversible actions such as deleting a node, and for short positive confirmations such as leaving a space.",
      },
      story: { inline: false, height: "360px" },
    },
  },
  args: {
    confirmLabel: "Yes, remove",
    declineLabel: "Cancel",
    hideIcon: false,
    isConfirmDisabled: false,
    isConfirmLoading: false,
    isDeclineDisabled: false,
    isConfirmPositive: false,
    message: "Are you sure?",
    title: "Wait!",
  },
  argTypes: {
    title: prop("Heading text.", "string", "undefined", "text"),
    message: prop(
      "Body. A string is wrapped in Text; an element is rendered as is.",
      "ReactNode | string",
      "undefined",
      "text"
    ),
    confirmLabel: prop("Label of the confirm button.", "string", '"Yes, remove"', "text"),
    declineLabel: prop("Label of the cancel button.", "string", '"Cancel"', "text"),
    middleLabel: prop("Label of the optional middle button.", "string", "undefined", "text"),
    confirmWidth: prop("Width of the confirm button.", "string", '"128px"', "text"),
    declineWidth: prop("Width of the cancel button.", "string", '"128px"', "text"),
    middleWidth: prop("Width of the middle button.", "string", '"128px"', "text"),
    hideIcon: prop("Hide the icon before the title.", "boolean", "false", "boolean"),
    iconName: prop("Icon shown before the title.", "string", '"warning_triangle_hollow"', "text"),
    isConfirmPositive: prop(
      "Use the brand colour instead of the danger colour for icon and confirm button.",
      "boolean",
      "false",
      "boolean"
    ),
    isConfirmDisabled: prop("Disable the confirm button.", "boolean", "false", "boolean"),
    isConfirmLoading: prop("Show a spinner on the confirm button.", "boolean", "false", "boolean"),
    isDeclineDisabled: prop("Disable the cancel button.", "boolean", "false", "boolean"),
    handleConfirm: callback("Called when the confirm button is clicked.", "click Confirm"),
    handleDecline: callback(
      "Called on cancel, the header close button and Escape. When omitted, the cancel and close buttons are not rendered.",
      "click Decline"
    ),
    // No action here: an injected handler would render an unlabelled middle button in every story.
    handleMiddle: {
      ...callback("Called when the middle button is clicked. The button renders only when this is set."),
      action: undefined,
    },
    "data-ga": prop(
      "Prefix for the analytics attributes on the buttons.",
      "string",
      '"confirmation-dialog"',
      "text"
    ),
    "data-testid": prop(
      "Test id prefix for the dialog parts.",
      "string",
      '"confirmationDialog"',
      "text"
    ),
    backdropContainerProps: prop(
      "Props passed to the backdrop container.",
      "object",
      "undefined",
      "object"
    ),
    backdropProps: prop(
      "Props passed to the backdrop, e.g. { backdropBlur: true }. Other Layer props are forwarded too.",
      "object",
      "undefined",
      "object"
    ),
  },
}
