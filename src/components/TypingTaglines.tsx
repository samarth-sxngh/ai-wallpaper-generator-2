import Typewriter from 'typewriter-effect';

const TypingTaglines = () => {
  return (
    <div className="h-20 text-xl font-medium text-center my-8">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("May the Pixels Be with You: Design Your Own Galaxy!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("In a World of Ordinary, Be Extraordinary")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Dil Se Digital: Crafting Art That Speaks to the Heart!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Zindagi Na Milegi Dobara: Create Art That Lasts a Lifetime!")
            .pauseFor(2000)
            .deleteAll()
            .start();
        }}
        options={{
          loop: true,
          cursor: "|",
          delay: 75,
          deleteSpeed: 50,
          wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
        }}
      />
    </div>
  );
};

export default TypingTaglines;
