import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const useSortableHeader = (columnId, enabled) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columnId,
    disabled: !enabled,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 1 : undefined,
  }

  return {
    sortableRef: setNodeRef,
    sortableStyle: style,
    dragHandleProps: enabled ? { ...attributes, ...listeners } : {},
    isDragging,
  }
}

export default useSortableHeader
