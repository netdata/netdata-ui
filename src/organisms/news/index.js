import React, { Fragment, useState, useEffect, useMemo, useCallback } from "react"
import useToggle from "@/hooks/useToggle"
import { TextSmall } from "@/components/typography"
import Flex from "@/components/templates/flex"
import Layer from "@/components/templates/layer"
import Container from "./container"
import Header from "./header"
import Item from "./item"
import useFetchNews from "./useFetchNews"

const emptyArray = []

const News = ({ app = "cloud", onCloseClick, children }) => {
  const lastSeen = localStorage.getItem("news_last_seen")
  const [news, setNews] = useState(emptyArray)
  const [error, setError] = useState()
  const [isOpen, toggle] = useToggle()
  const fetchNews = useFetchNews()

  useEffect(() => {
    fetchNews(
      app,
      ({ results }) => setNews(results),
      () => setError(true)
    )
  }, [])

  const upToDate = useMemo(() => {
    if (!news.length) return true

    const [firstItem] = news
    const { last_publication_date: publishedAt } = firstItem

    return new Date(lastSeen) >= new Date(publishedAt)
  }, [lastSeen, news])

  const onClose = useCallback(() => {
    toggle()
    localStorage.setItem("news_last_seen", new Date())
    if (onCloseClick) onCloseClick()
  }, [onCloseClick])

  return (
    <Fragment>
      {children({ toggle, isOpen, upToDate })}
      {isOpen && (
        <Layer backdrop onClickOutside={onClose} onEsc={onClose}>
          <Flex
            background="dropdown"
            round
            padding={[6]}
            width="640px"
            height={{ max: "640px" }}
            gap={4}
            column
          >
            <Header onClose={onClose} />
            <Container column gap={6}>
              {error && <TextSmall textAlign="center">Something went wrong 😔</TextSmall>}
              {!error && !news.length && (
                <TextSmall textAlign="center">There are no latest news</TextSmall>
              )}
              {!error && news.length > 0 && news.map(item => <Item key={item.id} item={item} />)}
            </Container>
          </Flex>
        </Layer>
      )}
    </Fragment>
  )
}

export default News
