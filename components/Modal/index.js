import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import IconButton from '../Button/IconButton'
import { colors } from '../../styles/variables'

export default function ({ children, close, visible }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => { close() }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCloseBtn}>
          <IconButton
            iconName="cross"
            onPress={() => { close() }} />
        </View>

        <View style={styles.modalView}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalCloseBtn: {
    position: "absolute",
    right: 12,
    top: 10
  },
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: "center",
    paddingBottom: 10,
    paddingHorizontal: 12,
    paddingTop: 52,
  },
  modalView: {
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
  }
})
