import React from 'react'
import ReactPlayer from 'react-player'

const page = () => {
    return (
        <ReactPlayer
            config={{
                youtube: {
                    playerVars: {
                        controls: 1, // Hiển thị bảng điều khiển
                        modestbranding: 1, // Ẩn logo YouTube
                        showinfo: 1, // Ẩn tiêu đề và thông tin video
                        rel: 1, // Tắt gợi ý video liên quan 
                        fs: 0,   // Ẩn fullscreen
                    },
                }
            }}
            ref={reactPlayerRef}
            width='100%' // Chiều rộng full
            height='100%' // Chiều cao được điều chỉnh theo tỷ lệ 16:9
            style={{ position: 'absolute', top: 0, left: 0 }} // Căn chỉnh cho video
            progressInterval={1000}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            url={`https://www.youtube.com/watch?v=${course.list_course[currentEpisode - 1].url}`}
            playing={playing}
            onProgress={() => handleOnProgress()}
        />
    )
}

export default page