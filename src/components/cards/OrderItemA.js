/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import node modules
import React from 'react';
import { StyleSheet, View } from 'react-native';

// import components
import Button from '../buttons/Button';
import { Caption, Subtitle1, Subtitle2 } from '../text/CustomText';
import Divider from '../divider/Divider';
import TouchableItem from '../TouchableItem';

// import colors. layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

// OrderItemA Config

// OrderItemA Styles
const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    backgroundColor: Colors.background
  },
  content: {
    width: Layout.SCREEN_WIDTH
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  orderNumber: {
    paddingBottom: 2,
    color: Colors.primaryColorDark
  },
  flexEnd: {
    alignItems: 'flex-end'
  },
  pv8: {
    paddingVertical: 8
  },
  itemContainer: {
    marginVertical: 4,
    backgroundColor: Colors.background
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  extraSmallButton: {
    width: 116,
    height: 32
  },
  onTheWay: {
    color: Colors.tertiaryColor
  },
  pending: {
    color: Colors.secondaryColor
  },
  delivered: {
    color: Colors.primaryColor
  }
});

const renderOrderItemsTotal = (items) => {
  const total = items.reduce((prev, next) => prev + next.price, 0);
  return total;
};

// OrderItemA Props
type Props = {
  onPress: () => {},
  activeOpacity: number,
  orderNumber: number,
  orderDate: string,
  orderItems: Array,
  orderStatus: string
};

// OrderItemA
const OrderItemA = ({
  onPress,
  activeOpacity,
  orderNumber,
  orderDate,
  orderItems,
  orderStatus
}: Props) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.header}>
        <View>
          <Subtitle2 style={styles.orderNumber}>{`Order #${orderNumber}`}</Subtitle2>
          <Caption>{orderDate}</Caption>
        </View>
        <View style={styles.flexEnd}>
          <Subtitle1>{`$ ${renderOrderItemsTotal(orderItems)}`}</Subtitle1>
          <Caption>{`${orderItems.length} items`}</Caption>
        </View>
      </View>

      <Divider type="middle" />

      <View style={styles.pv8}>
        {orderItems.map((item, index) => (
          <View key={index.toString()} style={styles.itemContainer}>
            <TouchableItem onPress={onPress} activeOpacity={activeOpacity}>
              <View style={styles.item}>
                <Subtitle2>{item.name}</Subtitle2>
                <Subtitle2>{`$ ${item.price}`}</Subtitle2>
              </View>
            </TouchableItem>
          </View>
        ))}
      </View>

      {orderStatus === 'on-the-way' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2>Status</Subtitle2>
            <Subtitle2 style={styles.onTheWay}>On the way</Subtitle2>
          </View>
          <Button title="Track" buttonStyle={styles.extraSmallButton} borderRadius={4} outlined />
        </View>
      )}

      {orderStatus === 'pending' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2>Status</Subtitle2>
            <Subtitle2 style={styles.pending}>Pending delivery</Subtitle2>
          </View>
          <Button
            title="Cancel"
            titleColor={Colors.error}
            buttonStyle={styles.extraSmallButton}
            borderRadius={4}
            borderColor={Colors.error}
            outlined
          />
        </View>
      )}

      {orderStatus === 'delivered' && (
        <View style={styles.footer}>
          <View>
            <Subtitle2>Status</Subtitle2>
            <Subtitle2 style={styles.delivered}>Delivered</Subtitle2>
          </View>
          <Button title="Reorder" buttonStyle={styles.extraSmallButton} borderRadius={4} outlined />
        </View>
      )}
    </View>
  </View>
);

export default OrderItemA;
