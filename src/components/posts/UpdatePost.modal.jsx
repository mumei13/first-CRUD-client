import React from 'react'
// import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap'
// import { Modal, Button, Form, Input, Select } from 'antd'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostsContext'
import { notification } from 'antd';
// const { Option } = Select;

// const statusPost = ['TO LEARN', 'LEARNING', 'LEARNED']

const UpdatePostModal = () => {
  // const [form] = Form.useForm();

  //Context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost
  } = useContext(PostContext)

  // State
  const [updatedPost, setUpdatedPost] = useState(post)

  useEffect(() => setUpdatedPost(post), [post])

  const { title, description, url, status } = updatedPost

  const onChangeUpdatePostForm = e => setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value })

  // Close and Cancel
  const closeModal = () => {
    setUpdatedPost(post)
    setShowUpdatePostModal(false)
  }

  // Send oke
  const onFinish = async e => {
    e.preventDefault()
    await updatePost(updatedPost)
    setShowUpdatePostModal(false)
    openNotification()
  }

  // Noti success
  const openNotification = () => {
    notification.open({
      message: 'Successfully',
      description:
        'Enjoy learning',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return (
    // <>
    //   <Modal title="What's up mann?" visible={showUpdatePostModal} onCancel={closeModal} onOk={onFinish}>
    //     <Form name="basic" onFinish={onFinish} form={form}
    //       labelCol={{
    //         span: 6,
    //       }}
    //       wrapperCol={{
    //         span: 18,
    //       }}
    //       initialvalues={{
    //         remember: false,
    //       }}>
    //       <Form.Item
    //         type='text'
    //         placeholder='Title'
    //         name='title'
    //         label='Title'
    //         onChange={onChangeUpdatePostForm}
    //         rules={[
    //           {
    //             required: true,
    //             message: 'Please enter title!',
    //           },
    //         ]} >
    //         <Input initialvalues={title} name='title' />
    //       </Form.Item>
    //       <Form.Item
    //         placeholder='Description'
    //         name='description'
    //         label='Description:'
    //         initialvalues={description}
    //         onChange={onChangeUpdatePostForm}
    //       >
    //         <Input name='description' />
    //       </Form.Item>
    //       <Form.Item
    //         type='text'
    //         placeholder='Youtube Tutorial URL'
    //         name='url'
    //         label='Link Youtube'
    //         onChange={onChangeUpdatePostForm}
    //       >
    //         <Input name='url' />
    //       </Form.Item>
    //       <Form.Item
    //         // value={post.status}
    //         // name='status'
    //         // label='Status:'
    //         // onChange={onChangeUpdatePostForm}
    //         // initialvalues={post.status}
    //         name='status'
    //         label='Status:'
    //       // onChange={onChangeUpdatePostForm}
    //       >
    //         <Select
    //         // initialvalues={post.status}
    //         // // onChange={onChangeUpdatePostForm}
    //         // allowClear
    //         // name='status'
    //         // onChange={onChangeUpdatePostForm}
    //         >
    //           <Option value="TO LEARN">TO LEARN</Option>
    //           <Option value="LEARNING">LEARNING</Option>
    //           <Option value="LEARNED">LEARNED</Option>
    //         </Select>
    //       </Form.Item>
    //     </Form>
    //   </Modal>
    // </>

    <Modal show={showUpdatePostModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>What's up mannnn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFinish}>
        <Modal.Body>
          <Form.Group>
            <label>Title</label>
            <Form.Control
              label='Title'
              type='text'
              placeholder='Title'
              name='title'
              required
              aria-describedby='title-help'
              value={title}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <label>Description</label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Description'
              name='description'
              value={description}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <label>Link to learn</label>
            <Form.Control
              type='text'
              placeholder='Youtube Tutorial URL'
              name='url'
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <label>Status</label>
            <Form.Control
              as="select"
              value={status}
              name='status'
              onChange={onChangeUpdatePostForm}
            >
              <option value='TO LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNED'>LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Update!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>

  )
}

export default UpdatePostModal