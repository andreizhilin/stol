export function NotepadPageSkeleton() {
  return (
    <div className='w-full h-screen animate-pulse mt-8'>
      <div className='w-44 bg-gray-300 h-6 mb-6' />
      <div className='flex space-x-1 mb-10'>
        <div className='w-36 bg-gray-300 h-6' />
        <div className='w-28 bg-gray-300 h-6' />
      </div>
      <div className='flex flex-col space-y-6 border p-10'>
        <div className='w-48 md:w-96 bg-gray-300 h-4' />
        <div className='w-full md:w-full bg-gray-300 h-4' />
        <div className='w-32 md:w-72 bg-gray-300 h-4' />
        <div className='w-48 md:w-full bg-gray-300 h-4' />
        <div className='w-full md:w-96 bg-gray-300 h-4' />
        <div className='w-24 md:w-48 bg-gray-300 h-4' />
        <div className='w-48 md:w-full bg-gray-300 h-4' />
        <div className='w-full md:w-96 bg-gray-300 h-4' />
        <div className='w-24 md:w-48 bg-gray-300 h-4' />
        <div className='w-48 md:w-full bg-gray-300 h-4' />
        <div className='w-full md:w-full bg-gray-300 h-4' />
        <div className='w-32 md:w-full h-24' />
      </div>
    </div>
  );
}
