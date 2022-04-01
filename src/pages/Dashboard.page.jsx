import React from 'react'
import { useContext, useEffect } from 'react'
import './css/Dashboard.scss'
import { PostContext } from '../contexts/PostsContext'
import { AuthContext } from '../contexts/AuthContext'
import SinglePost from '../components/posts/Post.modal'
import AddPostModal from '../components/posts/AddPost.modal'
import UpdatePostModal from '../components/posts/UpdatePost.modal'

import { Card, Col, Row, Divider, Spin } from 'antd';
import { Button } from 'react-bootstrap'



const Dashboard = () => {
  // Contexts
  const {
    authState: { user: { username } } } = useContext(AuthContext)
  const { postState: { post, posts, postsLoading }, getPosts, setShowAddPostModal } = useContext(PostContext)

  // Start get all posts
  useEffect(() => getPosts(), [])

  let body = null
  let bodyHavePost = []
  let statusPost = ['TO LEARN', 'LEARNING', 'LEARNED']

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spin animation='border' variant='info' />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <div className='card-null'>
        <Card className='text-center'>
          <div as='h1'>Hi {username}</div>
          <Card title="Card title" bordered={true}>
            <p>
              Click the button below to track first lesson you want to learn!
            </p>
            <Button variant='primary' onClick={setShowAddPostModal.bind(this, true)}>Start Study</Button>
          </Card>
        </Card>
      </div>
    )
  } else {
    // Filter post by status
    for (let i = 0; i < statusPost.length; i++) {
      bodyHavePost[i] = (
        <div key={statusPost[i]}>
          <h2 className='has-margin-left'>{statusPost[i]}</h2>
          <Row gutter={[16, 24]} className=''>
            {
              posts.map(post => (
                (post.status === statusPost[i])
                  ? (<Col lg={8} sm={24} md={12} xs={24} key={post._id} className=''>
                    <SinglePost post={post} />
                  </Col>)
                  : ('')
              ))
            }
          </Row>
          <Divider />
        </div>
      )
    }
    body = (
      <>
        {bodyHavePost}
        <Button className='btn-floating' onClick={setShowAddPostModal.bind(this, true)}>
          + Add
        </Button>
      </>
    )
  }

  return (
    <div className='body-signed-in'>
      <h1 className='middle-title'>Happy learning!</h1>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}
    </div>
  )
}

export default Dashboard