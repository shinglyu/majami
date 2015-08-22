import React from 'react';

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import TabbedArea from 'react-bootstrap/lib/TabbedArea';
import TabPane from 'react-bootstrap/lib/TabPane';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

import Order from './order';
import CreateEvent from './create-event';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this._handleOrder = this._handleOrder.bind(this);
    this._handleCreateEvent = this._handleCreateEvent.bind(this);

    let ordereds = [
      {
        id: 1,
        products: [
          { id: 1, name: '珍珠奶茶', amount: 1, price: 100 }
        ],
        pickup_addr: "捷運公館站 2 號出口",
        pickup_time: "8/23 13:00"
      },
      {
        id: 2,
        products: [
          { id: 1, name: '吃魚喝茶', amount: 1, price: 6000 }
        ],
        pickup_addr: "台大正門口",
        pickup_time: "8/23 23:30"
      }
    ];

    let expireds = [
      {
        id: 1,
        products: [
          { id: 1, name: '茉莉綠茶', amount: 1, price: 100 }
        ],
        pickup_addr: "捷運公館站 2 號出口",
        pickup_time: "8/5 13:00"
      },
      {
        id: 2,
        products: [
          { id: 1, name: '吃魚喝茶', amount: 1, price: 6000 }
        ],
        pickup_addr: "台大正門口",
        pickup_time: "7/8 23:30"
      }
    ]; 

    this.state = {
      ordereds: ordereds,
      expireds: expireds,
    };
  }

  _handleOrder() {
    this.refs.order.open();
  }

  _handleCreateEvent(storeId) {
    let store = this.state.stores.find(store => {
      return store.id === storeId;
    });
    this.refs.createEvent.open(store);
  }

  render() {
    let orderedItems = this.state.ordereds.map(item => {
      let products = item.products.map(product => {
      let style = {float:"right"};
        return (
          <span key={product.id}>
            {/*FIXME: hardcoded style*/}
            <span>{`${product.name} x${product.amount}`}</span> <span style={style}>{`NTD.${product.price}`}</span>
            <br />
          </span>
        );
      });

      return (
        <ListGroupItem
          key={item.id} header={`訂單 # ${item.id}`}
          onClick={this._handleOrder.bind(this, item.id)}>
            {products}
          <span>{`取貨地點: ${item.pickup_addr}`}</span>
          <br />
          <span>{`取貨時間: ${item.pickup_time}`}</span>
        </ListGroupItem>
      );
    });

    let expiredItems = this.state.expireds.map(item => {
      let products = item.products.map(product => {
      let style = {float:"right"};
        return (
          <span key={product.id}>
            {/*FIXME: hardcoded style*/}
            <span>{`${product.name} x${product.amount}`}</span> <span style={style}>{`NTD.${product.price}`}</span>
            <br />
          </span>
        );
      });

      return (
        <ListGroupItem
          key={item.id} header={`訂單 # ${item.id}`}
          onClick={this._handleOrder.bind(this, item.id)}>
            {products}
          <span>{`取貨地點: ${item.pickup_addr}`}</span>
          <br />
          <span>{`取貨時間: ${item.pickup_time}`}</span>
        </ListGroupItem>
      );
    });

    return (
      <Grid>
        <Row>
          <Col md={12}>
            <ButtonToolbar>
              <ButtonGroup>
                <Button>+ 幫我帶</Button>
                <Button>+ 我幫帶</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
          <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab='幫我帶'>
            <Panel header={'進行中的訂單'} bsStyle='info'>
              <ListGroup fill>
                {orderedItems}
              </ListGroup>
            </Panel>
          </TabPane>
          <TabPane eventKey={2} tab='我幫帶'>
            <Panel header={'歷史訂單'} bsStyle='warning'>
              <ListGroup fill>
                {expiredItems}
              </ListGroup>
            </Panel>
          </TabPane>
          </TabbedArea>
          <Nav bsStyle='pills' justified activeKey={1} onSelect={this.handleSelect}>
            <NavItem eventKey={1} >進行中</NavItem>
            <NavItem eventKey={2} >歷史訂單</NavItem>
          </Nav>
          </Col>
        </Row>

        <Order ref='order' />
        <CreateEvent ref='createEvent' />
      </Grid>
    );
  }

}

/*
TODO:
  * Fixed the 進行中 at the bottom
  * Expand the tab width to 50%
  * A add new button
*/