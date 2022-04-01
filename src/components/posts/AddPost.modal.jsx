import React from 'react'
// import { Modal, Button, Form } from 'react-bootstrap'
import { Modal, Form, Input, Button } from 'antd'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostsContext'
import { notification } from 'antd';

const AddPostModal = () => {
  //Context
  const { showAddPostModal, setShowAddPostModal, addPost } = useContext(PostContext)

  // State
  const [newPost, setNeWPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN'
  })

  const { TextArea } = Input;

  const { title, description, url } = newPost

  const onChangeNewPostForm = e => {
    setNeWPost({ ...newPost, [e.target.name]: e.target.value })
  }

  const closeModal = () => {
    resetAddNewPost()
  }

  // Add
  const onFinish = async e => {
    if (newPost.title === '') {
      closeModal()
    } else {
      e.preventDefault()
      await addPost(newPost)
      resetAddNewPost()
      return openNotification()
    }
  }

  const resetAddNewPost = () => {
    setNeWPost({
      title: '',
      description: '',
      url: ''
    })
    console.log(title)
    setShowAddPostModal(false)
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
    <>
      <Modal title="What's up mann?" visible={showAddPostModal} onCancel={closeModal} onOk={onFinish}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onFinish}
          >
            Submit
          </Button>,
        ]}
      >
        <Form name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            title: '',
            description: '',
            url: '',
          }}
        >
          <Form.Item
            label='Title'
            onChange={onChangeNewPostForm}
            value={title}
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter title!',
              },
            ]}
          >
            <Input name="title" />
          </Form.Item>

          <Form.Item
            label='Description'
            value={description}
            name='description'
            onChange={onChangeNewPostForm}
          >
            <TextArea rows={4} name='description' />
          </Form.Item>

          <Form.Item
            label='Link to learn'
            value={url}
            name='url'
            onChange={onChangeNewPostForm}
          >
            <Input name='url' />
          </Form.Item>
        </Form>
      </Modal>
    </>
    // <>
    //   <Modal show={showAddPostModal} onHide={closeModal}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>What do you want to learn?</Modal.Title>
    //     </Modal.Header>
    //     <Form onSubmit={onFinish}>
    //       <Modal.Body>
    //         <Form.Group>
    //           <Form.Control
    //             type='text'
    //             placeholder='Title'
    //             name='title'
    //             required
    //             aria-describedby='title-help'
    //             value={title}
    //             onChange={onChangeNewPostForm}
    //           />
    //           <Form.Text id='title-help' muted>
    //             Required
    //           </Form.Text>
    //         </Form.Group>
    //         <Form.Group>
    //           <Form.Control
    //             as='textarea'
    //             rows={3}
    //             placeholder='Description'
    //             name='description'
    //             value={description}
    //             onChange={onChangeNewPostForm}
    //           />
    //         </Form.Group>
    //         <Form.Group>
    //           <Form.Control
    //             type='text'
    //             placeholder='Youtube Tutorial URL'
    //             name='url'
    //             value={url}
    //             onChange={onChangeNewPostForm}
    //           />
    //         </Form.Group>
    //       </Modal.Body>
    //       <Modal.Footer>
    //         <Button variant='secondary' onClick={closeModal}>
    //           Cancel
    //         </Button>
    //         <Button variant='primary' type='submit'>
    //           LearnIt!
    //         </Button>
    //       </Modal.Footer>
    //     </Form>
    //   </Modal>
    // </>

  )
}

export default AddPostModal