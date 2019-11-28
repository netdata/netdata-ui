import React from "react"
import { storiesOf } from "@storybook/react"
import { Table } from "./table"
import { UserHeader } from "./components/UserHeader"

const sidebarStory = storiesOf("COMPONENTS|Controls/Table", module)

sidebarStory.add("empty", () => (
  <Table
    sortedBy={["user"]}
    columns={UserHeader}
    data={[
      {
        user: { photo: "https://i.pravatar.cc/30", name: "Fry", mail: "noway@noway.com" },
        dots: "123",
      },
      {
        user: { photo: "https://i.pravatar.cc/31", name: "Amy", mail: "amy@vong.com" },
        dots: "123",
      },
      {
        user: {
          photo: "https://i.pravatar.cc/32",
          name: "dr. Zoidberg",
          mail: "drZ@planetmail.com",
        },
        dots: "123",
      },
    ]}
    selectedItemsClb={items => console.log(items)}
  />
))
