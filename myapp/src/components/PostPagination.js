import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'reactstrap'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

function PostPagination() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      )
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  // Get current pOSTS
  const indexOfLastPost = currentPage * postsPerPage // 20
  const indexOfFirstPost = indexOfLastPost - postsPerPage // 20-10 = 10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost) // 10,20

  const paginate = (value) => {
    setCurrentPage(value)
  }

  return (
    <Container className='mt-3'>
      <h1 className='text-primary mb-3'>My Posts</h1>
      <Posts loading={loading} posts={currentPosts}></Posts>
      <PaginationBar
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Container>
  )
}

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading... </h2>
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map((post) => {
        return (
          <li key={post.id} className='list-group-item'>
            {post.title}
          </li>
        )
      })}
    </ul>
  )
}

const PaginationBar = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = []
  const [currentValue, setCurrentValue] = useState(1)
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i)
  }

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => {
            setCurrentValue(1)
            paginate(1)
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {
            setCurrentValue(currentValue - 1)
            paginate(currentValue - 1)
          }}
        />
      </PaginationItem>
      {pageNumber.map((value, index) => (
        <PaginationItem
          onClick={() => {
            paginate(value)
            setCurrentValue(value)
          }}
          key={index}
          active={currentValue === value ? true : false}
        >
          <PaginationLink>{value}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {
            setCurrentValue(currentValue + 1)
            paginate(currentValue + 1)
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => {
            setCurrentValue(10)
            paginate(10)
          }}
        />
      </PaginationItem>
    </Pagination>
  )
}

export default PostPagination
