import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import IconButton from '../Button/IconButton'
import globalStyle from '../../styles/globalStyle'
import { colors } from '../../styles/variables'

export default function Header({ canGoBack, title, subtitle, style, children, ...props }) {
  const navigation = useNavigation()

  return (
    <View style={[styles.headerWrapper, style]} {...props}>
      <View style={styles.headerContentWrapper}>
        { canGoBack &&
          <View style={styles.backBtn}>
            <IconButton
              backgroundColor={colors.overlay}
              iconName="chevron-left"
              onPress={() => navigation.goBack()} />
          </View>
        }

        {(title  || subtitle) &&
          <View style={styles.titleWrapper}>
            { title &&
              <Text style={globalStyle.bigTitle}>
                {title}
              </Text>
            }

            {subtitle &&
              <Text style={globalStyle.subtitle}>
                {subtitle}
              </Text>
            }
          </View>
        }
      </View>

      <View>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backBtn: {
    marginRight: 10
  },
  headerContentWrapper: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerWrapper: {
    ...globalStyle.section
  },
  titleWrapper: {
    flex: 1
  }
})
