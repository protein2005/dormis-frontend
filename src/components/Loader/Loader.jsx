import { motion as Motion } from 'framer-motion';
import './Loader.scss';

const Loader = () => {
  return (
    <Motion.div
      className="loader-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loader-screen__container">
        <Motion.div
          className="loader-screen__logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.1, 1],
            opacity: 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Dormis<span>.</span>
        </Motion.div>

        <div className="loader-screen__bar">
          <Motion.div
            className="loader-screen__progress"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <Motion.p
          className="loader-screen__text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Готуємо ваш простір...
        </Motion.p>
      </div>
    </Motion.div>
  );
};

export default Loader;