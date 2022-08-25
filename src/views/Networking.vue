<template>
  <div
  class="page networking">
    <div class="container">
      <Messenger/>
    </div>
  </div>
</template>
<script>
// import Messenger from '@/components/Networking/Messenger'

export default {
  name: "Networking",
  components:{
    Messenger: () => import('@/components/Networking/Messenger')
  }
}

</script>
