import React from 'react'
import { Button } from 'antd'
import { CaretRightOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useContext } from 'react'
import { PostContext } from '../../contexts/PostsContext';


const Buttons = ({ url, _id }) => {
  const { deletePost, findPost, setShowUpdatePostModal, } = useContext(
    PostContext
  )

  const choosePost = postId => {
    findPost(postId)
    setShowUpdatePostModal(true)
  }

  return (
    <>
      <Button
        style={{ margin: '2px' }}
        className='button-has-link'
        shape="circle"
        icon={<CaretRightOutlined />}
        size="large"
        href={url}
        target='_blank'
        type='primary'
      />
      <Button
        onClick={choosePost.bind(this, _id)}
        style={{ margin: '2px' }}
        shape='circle'
        icon={<EditOutlined />}
        size='large'
      />
      <Button
        onClick={deletePost.bind(this, _id)}
        style={{ margin: '2px' }}
        shape='circle'
        icon={<DeleteOutlined />}
        size='large'
      />
    </>
  )
}

export default Buttons