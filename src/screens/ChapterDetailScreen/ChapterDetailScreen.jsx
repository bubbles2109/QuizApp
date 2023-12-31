import React, {useEffect} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useDispatch, useSelector} from 'react-redux'
import {
  currentChapterSelector,
  loadCurrentChapter,
  startNewExamAttempt,
} from './ChapterDetailScreenViewModel'
import img from '../../assets/img'
import styles from './styles'
import {SharedHeader} from '../../components/shared'

function ChapterOverviewItem(props) {
  const {image, upperText, lowerText} = props
  return (
    <View style={styles.bodyChapterOverviewItem}>
      <Image
        style={styles.bodyChapterOverviewItemImage}
        source={image}
      />
      <View style={styles.bodyChapterOverviewItemTextView}>
        <Text style={styles.bodyChapterOverviewItemUpperText}>{upperText}</Text>
        <Text style={styles.bodyChapterOverviewItemLowerText}>{lowerText}</Text>
      </View>
    </View>
  )
}

function ChapterDetailScreen({route, navigation}) {
  const {headerTitle, subjectIndex, chapterIndex, chapterRefPath} = route.params
  const dispatch = useDispatch()
  const chapter = useSelector(currentChapterSelector)
  const chapterOverview = [
    {
      id: 1,
      image: img.checklist,
      upperText: '54',
      lowerText: 'Multiple Choice Questions',
    },
    {
      id: 2,
      image: img.medal,
      upperText: '70%',
      lowerText: 'To pass this test',
    },
  ]

  const backToPreviousScreen = () => {
    navigation.goBack()
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        loadCurrentChapter(subjectIndex, chapterIndex, chapterRefPath)
      )
    }
    fetchData()
  }, [chapterIndex, chapterRefPath, dispatch, subjectIndex])
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <SharedHeader
          title={headerTitle}
          preset="simple"
          btns={{
            left: {
              iconName: 'chevron-back',
              onPress: backToPreviousScreen,
            },
          }}
        />

        <View style={styles.body}>
          <Text style={styles.bodyTitle}>{chapter.name}</Text>
          <Text style={styles.bodySubtitle}>12k student took this</Text>

          <View style={styles.bodyChapterOverview}>
            {chapterOverview.map((info) => (
              <ChapterOverviewItem
                key={info.id}
                image={info.image}
                upperText={info.upperText}
                lowerText={info.lowerText}
              />
            ))}
          </View>

          <Text style={styles.bodyHeading}>Before you start</Text>

          <Text style={styles.bodyText}>
            {'\u2022'}You must complete this test in one session, make sure your
            Internet is reliable.{'\n'}
            {'\u2022'}One mark awarded for a correct answer. No negative marking
            will be there for wrong answer.{'\n'}
            {'\u2022'}More you give the correct answer more chance to win the
            badge.
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={async () => {
              await dispatch(startNewExamAttempt(chapter.questions))
              navigation.navigate('QuizStarting', {
                headerTitle: 'Quiz',
              })
            }}>
            <Text style={styles.footerButtonText}>Ôn tổng chương</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
export default ChapterDetailScreen
