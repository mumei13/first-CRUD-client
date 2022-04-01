import { Card, Row, Col, Badge } from 'antd/'
import Buttons from './Buttons'
import React from 'react'

const SinglePost = ({ post: { _id, status, title, description, url } }) => (
  <Badge.Ribbon color={status === 'LEARNED' ? 'green' : status === 'LEARNING' ? '#c4c433' : 'red'} text={status} >
    <Card className='shadow has-radius' bordered='true' bodyStyle={{ borderRadius: '10px' }} >
      <Row>
        <Col>
          <p className='post-title'>{title}</p>
        </Col>
        <Col className='text-right' style={{ marginLeft: 'auto' }}>
          <Buttons url={url} _id={_id} />
        </Col>
      </Row>
      <div>{description}</div>
    </Card>
  </Badge.Ribbon >
)

export default SinglePost